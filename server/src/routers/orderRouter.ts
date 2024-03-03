import { Router } from 'express'
import { body } from 'express-validator'
import { createOrder, getOrderByID, getOrders } from '../handlers/orderHandler'
import { handleInputErrors } from '../modules/middleware'

const orderRouter = Router()

const orderValidation = [
  body('customer_id').isString().withMessage('customer_id must be a string').optional(),
  body('order_date').isString().withMessage('order_date must be a string').notEmpty(),
  body('undiscounted_total')
    .isFloat({ min: 0 })
    .withMessage('undiscounted_total must be a float greater than or equal to 0')
    .optional(),
  body('total_discount')
    .isFloat({ min: 0 })
    .withMessage('total_discount must be a float greater than or equal to 0')
    .optional(),
  body('amount_due')
    .isFloat({ min: 0 })
    .withMessage('amount_due must be a float greater than or equal to 0')
    .optional(),
  body('order_details')
    .custom((value) => Array.isArray(value) && value.length > 0)
    .withMessage('order_details must be a non-empty array'),
  body('order_details[*].product_id').isString().withMessage('Each product_id must be a string'),
  body('order_details[*].qty').isInt({ min: 0 }).withMessage('Each qty must be an integer greater than or equal to 0'),
  body('order_details[*].unit_price')
    .isFloat({ min: 0 })
    .withMessage('Each unit_price must be a float greater than or equal to 0')
    .optional(),
  handleInputErrors,
]

/**
 * Order routes
 */

orderRouter.get('', getOrders)
orderRouter.get('/:id', getOrderByID)
orderRouter.post('', ...orderValidation, createOrder)

export default orderRouter
