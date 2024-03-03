import { isError, isIError, isValidationError, isFieldValidationError } from '../typeguards';
test('Testing type-guards', function () {
    // Checking isError
    var error = new Error('Error message');
    var obj = {};
    expect(isError(error)).toBe(true);
    expect(isError(obj)).toBe(false);
    // Checking IError
    var ierror = new Error('Error message');
    ierror.type = 'field';
    expect(isIError(ierror)).toBe(true);
    expect(isError(obj)).toBe(false);
    // Checking isValidationError
    var isvaliderr = new Error('Error message');
    isvaliderr.type = 'unknown-fields';
    expect(isValidationError(isvaliderr)).toBe(true);
    expect(isValidationError(obj)).toBe(false);
    // Checking isFieldValidationError
    var fielderr = new Error('Error message');
    fielderr.type = 'field';
    expect(isFieldValidationError(fielderr)).toBe(true);
    expect(isFieldValidationError(obj)).toBe(false);
});
