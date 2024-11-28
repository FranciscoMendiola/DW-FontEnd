import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { Component } from '@angular/core';
import { DtoProductList } from '../../_dto/dto-product-list';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-product-by-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-by-category.component.html',
  styleUrl: './product-by-category.component.css'
})

export class ProductByCategoryComponent {

  products: DtoProductList[] = []; // product list

  images: { [key: number]: ProductImage[] } = {};

  swal: SwalMessages = new SwalMessages(); // swal messages

  category: Category = new Category();
  category_id: any | number = 0;

  loading = false; // loading request

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category_id = Number(params.get('category_id'));
      if (category_id) {
        this.loading = true;
        this.category_id = category_id;
        this.getProductsByCategory(category_id);
        this.getCategory(category_id);
        this.loading = false;
      } else {
        this.swal.errorMessage("¡Categoría Inexistente!");
        this.loading = false;
      }
    });
  }

  // Category

  getCategory(category_id: number) {
    this.categoryService.getCategory(category_id).subscribe({
      next: (v) => {
        this.category = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Products

  getProductsByCategory(category_id: number) {
    this.loading = true;
    this.productService.getProductsByCategory(category_id).subscribe({
      next: (v) => {
        this.getCategory(this.category_id);
        this.products = v;
        this.products.forEach(product => {
          this.getProductImages(product.product_id);
        });
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProductImages(product_id: number) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.images[product_id] = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
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