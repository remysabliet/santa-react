export interface IError extends Error {
    type?: string;
    msg?: string;
}
