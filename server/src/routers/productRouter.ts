import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, deleteProduct, getProductByID, getProducts, updateProduct } from '../handlers/productHandler'
import { handleInputErrors } from '../modules/middleware'

const productRouter = Router()

const productValidation = [
  body('name').isString().notEmpty(),
  body('description').isString().optional(),
  body('unit_of_measure')
    .custom((value) => {
      if (Number.isInteger(Number(value))) {
        throw new Error('The value must not be an integer')
      }
      return true
    })
    .notEmpty(),
  body('restock_threshold').isFloat({ min: 1 }).withMessage('The value entered must be a positive number').notEmpty(),
  body('stocked_qty').isFloat({ min: 0 }).withMessage('The value entered must be a number >= 0 ').notEmpty(),
  body('unit_price').isFloat({ min: 1 }).withMessage('The value entered must be a positive number').notEmpty(),
  handleInputErrors,
]

/**
 * Product routes
 */

productRouter.get('', getProducts)
productRouter.get('/:id', getProductByID)
productRouter.put('/:id', ...productValidation, updateProduct)
productRouter.post('', ...productValidation, createProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
