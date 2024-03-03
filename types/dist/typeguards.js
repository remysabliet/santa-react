"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIError = exports.isError = exports.isFieldValidationError = exports.isValidationError = void 0;
var isValidationError = function (error) {
    return (error &&
        (error.type === 'alternative' ||
            error.type === 'grouped-alternative' ||
            error.type === 'unknown-fields' ||
            error.type === 'field'));
};
exports.isValidationError = isValidationError;
var isFieldValidationError = function (error) {
    return error.type === 'field';
};
exports.isFieldValidationError = isFieldValidationError;
var isError = function (err) {
    return err && typeof err.message === 'string';
};
exports.isError = isError;
var isIError = function (err) {
    return err && typeof err.type === 'string' && typeof err.message === 'string';
};
exports.isIError = isIError;
