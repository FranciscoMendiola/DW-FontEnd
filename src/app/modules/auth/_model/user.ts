export class User {

    address: string;
    mail: string;
    name: string;
    password: string;
    region_id: number;
    rfc: string;
    rol_id: number;
    surname: string;
    user_id: number;
    username: string;

    constructor() {
        this.address = '';
        this.mail = '';
        this.name = '';
        this.password = '';
        this.region_id = 1;
        this.rfc = '';
        this.rol_id = 1;
        this.surname = '';
        this.user_id = 0;
        this.username = '';
    }
}