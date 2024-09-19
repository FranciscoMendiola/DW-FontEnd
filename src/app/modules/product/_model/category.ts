
export class Category {

    category_id: number = 0;
    category: string = "";
    tag: string = "";
    status: number = 0;

    constructor(category_id: number, category: string, tag: string, status: number) {
        this.category_id = category_id;
        this.category = category;
        this.tag = tag;
        this.status = status;
    }
}
 
