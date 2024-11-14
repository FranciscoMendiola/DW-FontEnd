export class DtoInvoiceList {

    invoice_id: number;
    total: number;
    created_at: string;

    constructor() {
        this.invoice_id = 0;
        this.total = 0;
        this.created_at = '';
    }
}
