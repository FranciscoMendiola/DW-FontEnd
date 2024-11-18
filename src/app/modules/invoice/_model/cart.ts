export class Cart {

    cart_id: number;
    rfc: string;
    gtin: string;
    quantity: number;
    status: number;

    constructor() {
        this.cart_id = 0;
        this.rfc = '';
        this.gtin = '';
        this.quantity = 0;
        this.status = 0;
    }
}
