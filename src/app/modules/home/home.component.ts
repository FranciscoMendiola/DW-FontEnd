import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../product/_service/category.service';
import { ProductService } from '../product/_service/product.service';
import { SwalMessages } from '../../shared/swal-messages';
import { Category } from '../product/_model/category';
import { SharedModule } from '../../shared/shared-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  categories: Array<Category> = [];
  sections: any = [];
  limit: number = 4;

  swal = new SwalMessages;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getActiveCategories();

  }
  getActiveCategories(): void {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => this.categories = v,
      error: (e) =>
        this.swal.errorMessage("No fue posible recuperar la información de la api"),
      complete: () => {
        for (let i in this.categories) {
          this.sections.push([]);
          this.getProductsByC(this.categories[i].category_id, Number(i));
        }
      }
    });
  }

  getProductsByC(category_id: number, i: number): void {
    this.productService.getProductsByCategory(category_id).subscribe({
      next: (v) => this.sections[i] = v,
      error: (e) => this.swal.errorMessage(e),
      complete: () => {
        if (this.sections[i].length > (this.limit - 1))
          this.sections[i].splice(this.limit, this.sections[i].length);

        for (let product of this.sections[i]) {
          if (product.image == 'data:image/png;base64,')
            product.image = 'noimg.jpg'

        }
      }
    });
  }

  navigateToView(gtin: string) {
    if (gtin) {
      this.router.navigate(['/product/', gtin]);
    } else {
      this.swal.errorMessage("¡No hay información del producto para mostrar!");
    }
  }
}