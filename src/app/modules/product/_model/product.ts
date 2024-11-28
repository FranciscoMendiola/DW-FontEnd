export class Product {
    product_id: number;
    product: string;
    gtin: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    status: number;

    constructor() {
        this.product_id = 0;
        this.product = '';
        this.gtin = '';
        this.description = '';
        this.price = 0;
        this.stock = 0;
        this.category_id = 0;
        this.status = 0;
    }
}
