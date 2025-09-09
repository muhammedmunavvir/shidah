import { Product } from "./product";

export interface CartItem{
    _id?: string;
    productId?:string|Product,
    userId?:string,
    name?:string,
    qty?:number
}