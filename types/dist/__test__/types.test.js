"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeguards_1 = require("../typeguards");
test('Testing type-guards', function () {
    // Checking isError
    var error = new Error('Error message');
    var obj = {};
    expect((0, typeguards_1.isError)(error)).toBe(true);
    expect((0, typeguards_1.isError)(obj)).toBe(false);
    // Checking IError
    var ierror = new Error('Error message');
    ierror.type = 'field';
    expect((0, typeguards_1.isIError)(ierror)).toBe(true);
    expect((0, typeguards_1.isError)(obj)).toBe(false);
    // Checking isValidationError
    var isvaliderr = new Error('Error message');
    isvaliderr.type = 'unknown-fields';
    expect((0, typeguards_1.isValidationError)(isvaliderr)).toBe(true);
    expect((0, typeguards_1.isValidationError)(obj)).toBe(false);
    // Checking isFieldValidationError
    var fielderr = new Error('Error message');
    fielderr.type = 'field';
    expect((0, typeguards_1.isFieldValidationError)(fielderr)).toBe(true);
    expect((0, typeguards_1.isFieldValidationError)(obj)).toBe(false);
});
