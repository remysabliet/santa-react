import { Request, Response, NextFunction } from 'express'
import { Cursor } from 'rethinkdb'
import { v4 as uuid } from 'uuid'

import db from '../db/api'
import { calculateOrderTotals, checkInventory } from '../util/orderUtils'

import { IError } from '@warehouse/types'
import { ICustomer, IOrderDetail, IProduct } from '@warehouse/types'

import { replenishInventory } from './productHandler'

// Get all tuples for a table
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await db.getAllRecords('orders').then((cursor: Cursor) => cursor.toArray())

    res.json({ data: orders })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Get one
export const getOrderByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const order = await db.loadOrderById(id)
    res.json({ data: order })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

/**
 * Create one order and update the customer's credit amount and the product's stocked quantity accordingly.
 * - If the customer does not have enough credit, the order is not created.
 * - If one or more products do not have enough inventory, the order is not created and the inventory is replenished.
 * - If the product's stocked quantity is below the restock threshold after an order executed, the inventory is replenished.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We gather the info for each product part of the order
    const promises = req.body.order_details.map(async (orderDetail: IOrderDetail) => {
      const productInfo: IProduct | null = await db.loadProductById(orderDetail.product_id)
      if (productInfo && productInfo.product_id) {
        return { ...orderDetail, unit_price: productInfo.unit_price }
      }
    })

    const orderDetails = await Promise.all(promises)

    // console.log('1 - orderDetails', orderDetails)

    // We check if we have enough inventory for all products
    const inventoryResult: boolean = await checkInventory(orderDetails)

    // console.log('inventoryResult', inventoryResult)
    if (!inventoryResult) {
      return res.status(400).json({
        message: `Order cannot be created. Insufficient inventory for one or more products. Product replenishment has been requested.`,
      })
    }

    // Check if the customer exists and has enough credit
    const customer: ICustomer | null = await db.loadCustomerById(req.body.customer_id)

    // console.log('2 - customer', customer)

    if (customer) {
      // Calculate the order totals
      const orderInfo = { ...req.body, order_details: orderDetails }
      const totals = calculateOrderTotals(orderInfo, customer?.discount_pct)

      if (totals.amount_due) {
        if (totals.amount_due > customer.credit_amount) {
          return res.status(400).json({
            message: `Order cannot be created. Amount due ${totals.amount_due} exceeds customer's credit amount(${customer.credit_amount}).`,
          })
        } else {
          // We are all good to create the order

          // 1 - Update the customer's credit amount
          customer.credit_amount = Number((customer.credit_amount - totals.amount_due).toFixed(2)) // We round up to 2 decimals
          const customerResult: IRethinkDBResult = await db.updateCustomer(customer)

          if (!customerResult.replaced) {
            return res.status(400).json({
              message: `Order cannot be created. Customer credit amount could not be updated.`,
            })
          } else {
            console.log(" customer's credit amount updated", customer.credit_amount)

            // 2 - Create the order
            const payload = {
              order_id: uuid(),
              ...req.body,
              ...totals,
              order_details: orderDetails,
            }

            // console.log('Creating order in DB', payload)
            const result: IRethinkDBResult = await db.insertOrder(payload)

            if (result.inserted) {
              const order = await db.loadOrderById(payload.order_id)
              res.status(201).json({ data: order })
            }

            // 3 - Update the product's stocked quantity
            req.body.order_details.forEach(async (orderDetail: IOrderDetail) => {
              const product = await db.loadProductById(orderDetail.product_id)
              if (product?.product_id) {
                product.stocked_qty = product.stocked_qty - orderDetail.qty
                const productResult: IRethinkDBResult = await db.updateProduct(product)
                if (!productResult.replaced) {
                  return res.status(400).json({
                    message: `Order cannot be created. Product stocked quantity could not be updated.`,
                  })
                }

                if (product.stocked_qty <= product.restock_threshold) {
                  await replenishInventory(product.product_id, product.restock_threshold)
                }

                console.log(`Product ${product.product_id} stock updated!`)
              }
            })

            next()
          }
        }
      }
    } else {
      return res.status(404).json({ message: `Customer "${req.body.customer_id}" not found.` })
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}
