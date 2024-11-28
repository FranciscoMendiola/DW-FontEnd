export class DtoCustomerList {

    customer_id: number;
    name: string;
    surname: string;
    rfc: string;
    status: number;

    constructor() {
        this.customer_id = 0;
        this.name = '';
        this.surname = '';
        this.rfc = '';
        this.status = 0;
    }
}
