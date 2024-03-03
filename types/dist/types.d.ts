export interface ICustomer {
    customer_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    phone: string;
    credit_amount: number;
    discount_pct: number;
}
export interface IProduct {
    product_id?: string;
    name: string;
    description: string;
    unit_of_measure: string;
    restock_threshold: number;
    stocked_qty: number;
    unit_price: number;
}
export interface IOrderTotal {
    undiscounted_total?: number;
    total_discount?: number;
    amount_due?: number;
}
export interface IOrderDetail {
    product_id: string;
    qty: number;
    unit_price?: number;
}
export interface IOrder extends IOrderTotal {
    order_id?: string;
    customer_id: string;
    order_date: string;
    order_details: IOrderDetail[];
}
export interface IError extends Error {
    type?: string;
    msg?: string;
}
