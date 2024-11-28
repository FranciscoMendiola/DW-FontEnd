export class Item {

    item_id: number;
    invoice_id: number;
    gtin: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    taxes: number;
    total: number;

    constructor() {
        this.item_id = 0;
        this.invoice_id = 0;
        this.gtin = '';
        this.quantity = 0;
        this.unit_price = 0;
        this.subtotal = 0;
        this.taxes = 0;
        this.total = 0;
    }
}
