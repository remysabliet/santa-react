import { FieldValidationError, ValidationError } from 'express-validator';
import { IError } from './types';
export declare const isValidationError: (error: any) => error is ValidationError;
export declare const isFieldValidationError: (error: any) => error is FieldValidationError;
export declare const isError: (err: any) => err is Error;
export declare const isIError: (err: any) => err is IError;
