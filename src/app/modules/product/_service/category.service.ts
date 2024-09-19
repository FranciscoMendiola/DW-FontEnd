import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Category[] {
    let categories: Category[] = [];

    categories.push(new Category(1, "Electrónica", "Gadgets", 1));
    categories.push(new Category(2, "Libros", "Literatura", 1));
    categories.push(new Category(3, "Ropa", "Moda", 0));


    return categories;
  }
}
