import { Request, Response, NextFunction } from 'express'
import { Cursor } from 'rethinkdb'
import { v4 as uuid } from 'uuid'

import db from '../db/api'

import { IError } from '@warehouse/types'

// Get all tuples for a table
export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await db.getAllRecords('customers').then((cursor: Cursor) => cursor.toArray())

    res.json({ data: customers })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Get one
export const getCustomerByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const customer = await db.loadCustomerById(id)
    res.json({ data: customer })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Create one
export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exist = await db.queryCustomer({ email: req.body.email }).then((cursor: Cursor) => cursor.toArray())
    if (!!exist.length) {
      return res.status(409).json({
        message: `Customer with the same email address ${req.body.email} (id: ${exist[0].customer_id}) already exists.`,
      })
    }

    const payload = {
      ...req.body,
      customer_id: uuid(),
      credit_amount: Math.round(parseFloat(req.body.credit_amount)),
      discount_pct: Math.round(parseFloat(req.body.discount_pct)),
    }
    const result: IRethinkDBResult = await db.insertCustomer(payload)

    if (result.inserted) {
      const customer = await db.loadCustomerById(payload.customer_id)
      return res.status(201).json({ data: customer })
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Update one
export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exist = await db.loadCustomerById(req.params.id)
    if (exist) {
      const duplicate = await db.queryCustomer({ email: req.body.email }).then((cursor: Cursor) => cursor.toArray())
      if (duplicate.length) {
        if (duplicate[0].customer_id !== req.params.id && duplicate[0].email === req.body.email) {
          return res.status(409).json({
            message: `A customer with the same email address "${duplicate[0].email}" (id: ${duplicate[0].customer_id}) already exists.`,
          })
        }
      }

      const payload = {
        ...req.body,
        customer_id: req.params.id,
        credit_amount: exist.credit_amount,
        discount_pct: Math.round(parseFloat(req.body.discount_pct)),
      }
      const result: IRethinkDBResult = await db.updateCustomer(payload)

      return res.json({ data: payload })
    } else {
      return res.status(404).json({ message: `Customer (id: ${req.params.id}) not found.` })
    }
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}

// Delete one
export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const deleted = await db.deleteCustomer(id)

    res.status(204).json({ data: deleted })
  } catch (error) {
    ;(error as IError).type = 'db'
    next(error)
  }
}
