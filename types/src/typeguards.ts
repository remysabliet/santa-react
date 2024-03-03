import { FieldValidationError, ValidationError } from 'express-validator'

import { IError } from './types'

export const isValidationError = (error: any): error is ValidationError => {
  return (
    error &&
    (error.type === 'alternative' ||
      error.type === 'grouped-alternative' ||
      error.type === 'unknown-fields' ||
      error.type === 'field')
  )
}

export const isFieldValidationError = (error: any): error is FieldValidationError => {
  return error.type === 'field'
}
export const isError = (err: any): err is Error => {
  return err && typeof err.message === 'string'
}

export const isIError = (err: any): err is IError => {
  return err && typeof err.type === 'string' && typeof err.message === 'string'
}
