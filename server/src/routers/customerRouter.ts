import { Router } from 'express'
import { body } from 'express-validator'

import {
  createCustomer,
  deleteCustomer,
  getCustomerByID,
  getCustomers,
  updateCustomer,
} from '../handlers/customerHandler'
import { handleInputErrors } from '../modules/middleware'

const customerRouter = Router()

const customerValidation = [
  body('first_name').isString().notEmpty(),
  body('last_name').isString().notEmpty(),
  body('email').isEmail().withMessage('The value entered is not a valid email').notEmpty(),
  body('address').isString().optional(),
  body('city').isString().notEmpty(),
  body('phone').isString().notEmpty(),
  body('discount_pct').isFloat({ min: 0, max: 15 }).withMessage('Must be a value between 0 and 15.').notEmpty(),
  handleInputErrors,
]
/**
 * Customer routes
 */

customerRouter.get('', getCustomers)
customerRouter.get('/:id', getCustomerByID)
customerRouter.put(
  '/:id',
  body('credit_amount').not().exists().withMessage('The property "credit_amount" should not be part of the body'), // staff cannot update credit_amount
  ...customerValidation,
  updateCustomer,
)
customerRouter.post(
  '',
  body('credit_amount').isFloat({ min: 0 }).withMessage('The value must be an integer >= 0').notEmpty(),
  ...customerValidation,
  createCustomer,
)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
