import { CustomerImage } from "./customer-image";

export class Customer {

    customer_id: number;
    name: string;
    surname: string;
    rfc: string;
    mail: string;
    address: string;
    region: string;
    region_id: number;
    image: CustomerImage;
    status: number;

    constructor() {
        this.customer_id = 0;
        this.name = '';
        this.surname = '';
        this.rfc = '';
        this.mail = '';
        this.address = '';
        this.region = '';
        this.region_id = 0;
        this.image = new CustomerImage();
        this.status = 0;
    }
}
