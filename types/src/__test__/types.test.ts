import { isError, isIError, isValidationError, isFieldValidationError } from '../typeguards'
import { IError } from '../types'

test('Testing type-guards', () => {
  // Checking isError
  const error = new Error('Error message')
  const obj = {}

  expect(isError(error)).toBe(true)
  expect(isError(obj)).toBe(false)

  // Checking IError
  const ierror = new Error('Error message') as IError
  ierror.type = 'field'
  expect(isIError(ierror)).toBe(true)
  expect(isError(obj)).toBe(false)

  // Checking isValidationError
  const isvaliderr = new Error('Error message') as IError
  isvaliderr.type = 'unknown-fields'
  expect(isValidationError(isvaliderr)).toBe(true)
  expect(isValidationError(obj)).toBe(false)

  // Checking isFieldValidationError
  const fielderr = new Error('Error message') as IError
  fielderr.type = 'field'
  expect(isFieldValidationError(fielderr)).toBe(true)
  expect(isFieldValidationError(obj)).toBe(false)
})
