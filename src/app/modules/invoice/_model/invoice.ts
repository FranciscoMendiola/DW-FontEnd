export class Invoice {
    invoice_id: number;
    rfc: string;
    subtotal: number;
    taxes: number;
    total: number;
    created_at: Date;
    status: number;
    items: Array<{
      product_name: string;
      quantity: number;
      price: number;
      total: number;
    }>;
  
    constructor() {
      this.invoice_id = 0;
      this.rfc = '';
      this.subtotal = 0;
      this.taxes = 0;
      this.total = 0;
      this.created_at = new Date();
      this.status = 0;
      this.items = [];
    }
  }
  