import { Request, Response, NextFunction } from 'express'
import { Cursor } from 'rethinkdb'
import { v4 as uuid } from 'uuid'

import db from '../db/api'

import { IError } from '@warehouse/types'

// Get all tuples for a table
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await db.getAllRecords('products').then((cursor: Cursor) => cursor.toArray())

    res.json({ data: products })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Get one
export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const product = await db.loadProductById(id)
    res.json({ data: product })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Create one
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = {
      ...req.body,
      product_id: uuid(),
      restock_threshold: Math.round(parseFloat(req.body.restock_threshold)),
      stocked_qty: Math.round(parseFloat(req.body.stocked_qty)),
    }
    const result: IRethinkDBResult = await db.insertProduct(payload)

    if (result.inserted) {
      const product = await db.loadProductById(payload.product_id)
      return res.status(201).json({ data: product })
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Update one
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exist = await db.loadProductById(req.params.id)
    if (exist) {
      const payload = {
        ...req.body,
        product_id: req.params.id,
        restock_threshold: Math.round(parseFloat(req.body.restock_threshold)),
        stocked_qty: Math.round(parseFloat(req.body.stocked_qty)),
      }
      const result: IRethinkDBResult = await db.updateProduct(payload)
      return res.status(200).json({ data: payload })
    } else {
      return res.status(404).json({ message: `Product "${req.body.name}" (id: ${req.params.id}) not found.` })
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Delete one
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const deleted = await db.deleteProduct(id)

    res.status(204).json({ data: deleted })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

/**
 * Refill a product if its stocked_qty is below its restock_threshold
 * @param {string} product_id
 * @returns {boolean} true if the product was replenished, false otherwise
 */
export const replenishInventory = async (product_id: string, threeshold: number): Promise<boolean> => {
  try {
    const product = await db.loadProductById(product_id)
    if (product?.product_id) {
      const payload = {
        ...product,
        stocked_qty: product.stocked_qty + threeshold,
      }
      const res: IRethinkDBResult = await db.updateProduct(payload)
      if (res.replaced) {
        console.log(`Product ${product_id} replenished to ${payload.stocked_qty}.`)
        return true
      }
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    throw error
  }
  return false
}
