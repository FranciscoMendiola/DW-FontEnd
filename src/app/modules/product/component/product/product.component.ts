import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { Component } from '@angular/core';
import { DtoProductList } from '../../_dto/dto-product-list';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../_service/product.service';
import { Router } from '@angular/router';
import { PagingConfig } from '../../../../shared/paging-config';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';

declare var $: any; // JQuery

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {

  products: DtoProductList[] = []; // product list

  categories: Category[] = []; // category list

  page: number | Event = 1;

  form: any;

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  loading = false; // loading request
  current_date = new Date(); // hora y fecha actual
  isAdmin = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    if (localStorage.getItem("user")) {

      let user = JSON.parse(localStorage.getItem("user")!);

      if (user.rol == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

    if (!this.isAdmin) {
      this.router.navigate(['/home']);
    } else {

      this.current_date = new Date();
      this.getProducts();
      if (this.products.length > 0) {
        this.getActiveCategories();
      }

      this.pageConfig = {
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        totalItems: this.totalItems
      }


      // Product form
      this.form = this.formBuilder.group({
        product: ["", [Validators.required]],
        gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        description: ["", [Validators.required]],
        price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
        stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
        category_id: [0, [Validators.required]],
      });
    }
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getProducts(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.sort((a: { product_id: number; }, b: { product_id: number; }) => a.product_id - b.product_id);
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
        this.swal.errorMessage("No fue posible recuperar los productos"); // show message
        this.loading = false;
      }
    });
  }

  disableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la desactivación del producto',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.disableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación del producto',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.enableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  showProductDetails(gtin: string) {
    this.router.navigate(['product/' + gtin]);
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // Catalogues 

  getActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}