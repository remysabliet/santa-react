export var isValidationError = function (error) {
    return (error &&
        (error.type === 'alternative' ||
            error.type === 'grouped-alternative' ||
            error.type === 'unknown-fields' ||
            error.type === 'field'));
};
export var isFieldValidationError = function (error) {
    return error.type === 'field';
};
export var isError = function (err) {
    return err && typeof err.message === 'string';
};
export var isIError = function (err) {
    return err && typeof err.type === 'string' && typeof err.message === 'string';
};
