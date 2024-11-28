export class DtoProductList {
    product_id: number;
    product: string;
    gtin: string;
    price: number;
    category_id: number;
    status: number;

    constructor() {
        this.product_id = 0;
        this.product = '';
        this.gtin = '';
        this.price = 0;
        this.category_id = 0;
        this.status = 0;
    }
}
