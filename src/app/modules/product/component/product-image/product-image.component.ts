import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../invoice/_service/cart.service';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { Component } from '@angular/core';
import { Customer } from '../../../customer/_model/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoCartDetails } from '../../../invoice/_dto/dto-cart-details';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})

export class ProductImageComponent {

  isAdmin = false;
  user: any;

  cart: DtoCartDetails[] = [];

  product: Product = new Product(); // product
  gtin: any | string = "";
  quantity: number = 1; // quantity of a product

  customer: Customer = new Customer(); // customer
  rfc: any | string = "";

  images: any | ProductImage[] = []; // product images

  category: any | Category = new Category();
  categories: Category[] = []; // category list

  cartItemCount: number = 0;

  activeImageIndex: number = 0;

  productData: any[] = [];

  form: any;

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages
  loggedIn = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private customerService: CustomerService,
    private cartService: CartService,
    private service: NgxPhotoEditorService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user")) {

      this.user = JSON.parse(localStorage.getItem("user")!);

      if (this.user.rol == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
      this.getActiveCategories();
      this.getCart();

      if (localStorage.getItem("token")) {
        this.loggedIn = true;
        if (!this.isAdmin) {
          this.getCustomerDetail();
        }
      }
    } else {
      this.swal.errorMessage("¡Producto Inexistente!");
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

  onSubmit() {
    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message

        if (this.form.controls['gtin'].value != this.gtin) {
          this.gtin = this.form.controls['gtin'].value!;

          let currentURL = this.router.url.split("/");
          currentURL.pop();
          currentURL.push();

          this.redirect(currentURL);
        }

        this.getProduct();

        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProduct() {
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.getCategory(this.product.category_id);
        this.getProductImages(this.product.product_id);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateProduct() {
    this.form.reset();
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  getProductImages(product_id: number) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.images = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateProductImage(image: string) {
    let productImage = new ProductImage();
    productImage.image = image;
    productImage.product_id = this.product.product_id;

    this.productImageService.updateProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getProductImages(this.product.product_id); // reload products
        this.activeImageIndex = 0;
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  updateQuantity(value: string): void {
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue >= 1) {
      this.quantity = parsedValue;
    }
  }

  incrementImageIndex() {
    if (this.activeImageIndex === (this.images.length - 1)) {
      this.activeImageIndex = 0;
    } else {
      this.activeImageIndex++;
    }
  }

  decrementImageIndex() {
    if (this.activeImageIndex === 0) {
      this.activeImageIndex = (this.images.length - 1);
    } else {
      this.activeImageIndex--;
    }
  }

  deleteActiveImage() {
    if (this.images.length > 0 && this.activeImageIndex != null) {
      const imageToDelete = this.images[this.activeImageIndex];
      this.deleteProductImage(imageToDelete);
    }
  }

  deleteProductImage(productImage: ProductImage) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la eliminación de la imagen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productImageService.deleteProductImage(productImage.product_image_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getProductImages(productImage.product_id);
            this.activeImageIndex = 0;
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  addToCart() {
    if (this.product.stock >= (this.quantity + this.cartItemCount) && (this.quantity + this.cartItemCount) >= 1) {


      if (this.gtin) {
        const newItem = {
          rfc: this.rfc,
          gtin: this.gtin,
          quantity: this.quantity
        };

        this.cartService.addToCart(newItem).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCartItemCount();
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      } else {
        console.error('El valor de GTIN es nulo o no válido');
        this.swal.errorMessage('¡GTIN inválido!');
      }
    } else {
      this.swal.errorMessage('¡Cantidad inválida!');
    }
  }

  navigateToBuy() {
    if (this.product.stock >= (this.quantity + this.cartItemCount) && (this.quantity + this.cartItemCount) >= 1) {
      this.addToCart();
      this.router.navigate(['/cart']);

    } else {
      this.swal.errorMessage('¡Cantidad inválida!');
    }
  }

  getCartItemCount() {
    this.cart.forEach(e => {
      if (e.product.gtin === this.gtin) {
        this.cartItemCount = e.quantity;
        console.log(e.quantity);
        return;
      }
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cart = v;
        this.getCartItemCount();
      },
      error: (e) => {
      }
    });
  }



  addToProductData() {
    if (this.gtin && this.quantity) {
      const product = {
        gtin: this.product.gtin,
        product: this.product,
        price: this.product.price,
        quantity: this.quantity,
        image: this.images[0].image
      };
      this.productData.push(product);
    } else {
      console.error('El valor de GTIN o la cantidad son nulos o no válidos');
    }
  }


  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }



  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // Customer 

  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe({
      next: (v) => {
        this.customer = v;
        this.rfc = this.customer.rfc;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
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