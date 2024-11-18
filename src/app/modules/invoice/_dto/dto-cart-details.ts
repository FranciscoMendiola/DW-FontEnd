import { Product } from "../../product/_model/product";

export class DtoCartDetails {

    cart_id: number;
    rfc: string;
    gtin: string;
    quantity: number;
    status: number;
    product: Product;
    image: string;

    constructor() {
        this.cart_id = 0;
        this.rfc = '';
        this.gtin = '';
        this.quantity = 0;
        this.status = 0;
        this.product = new Product();
        this.image = '';
    }
}
