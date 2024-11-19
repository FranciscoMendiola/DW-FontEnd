import { CartService } from '../../_service/cart.service';
import { Component } from '@angular/core';
import { Customer } from '../../../customer/_model/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { Router } from '@angular/router';
import { Product } from '../../../product/_model/product';
import { ProductImage } from '../../../product/_model/product-image';
import { SwalMessages } from '../../../../shared/swal-messages';
import { PagingConfig } from '../../../../shared/paging-config';
import { SharedModule } from '../../../../shared/shared-module';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {

  cart: DtoCartDetails[] = [];
  cartItemCount: number = 0;
  cartTotal: number = 0;

  products: any[] = [];
  product: Product = new Product(); // product
  gtin: any | string = "";
  quantity: number = 1; // quantity of a product

  customer: Customer = new Customer();
  rfc: any | string = "";

  images: any | ProductImage[] = []; // product images

  page: number | Event = 1;

  swal: SwalMessages = new SwalMessages(); // Swal messages

  productData: any[] = [];
  customerData: any = {};

  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private router: Router,
  ) { }

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    this.getCart();
    this.getCustomerDetail();

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cart = v;
        this.getCartItemCount();
        this.calculateCartTotal();

        this.cart.forEach(cartItem => {
          const product = {
            gtin: cartItem.product.gtin,
            product: cartItem.product.product,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            image: cartItem.image
          };
          this.productData.push(product);
        });
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  clearCart() {
    if (this.cart.length != 0) {
      this.swal.confirmMessage.fire({
        title: '¿Deseas vaciar tu carrito?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.cartService.clearCart().subscribe({
            next: (v) => {
              this.swal.successMessage(v.message); // show message
            },
            error: (e) => {
              console.error(e);
              this.swal.errorMessage(e.error!.message); // show message
            }
          });
        }
      });
    }
  }

  removeFromCart(product_id: number) {
    this.swal.confirmMessage.fire({
      title: '¿Deseas eliminar este producto de tu carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(product_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); // show message
            this.ngOnInit();
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getCartItemCount() {
    this.cartItemCount = 0;
    this.cart.forEach(e => {
      this.cartItemCount += e.quantity;
    });
  }

  calculateCartTotal() {
    this.cartTotal = this.cart.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  }

  navigateToBuy() {
    if (this.productData.length > 0 && this.customerData && this.customerData.rfc) {
      this.router.navigate(['/cart/buy'], { state: { products: [...this.cart], customer: this.customerData } });
      this.productData = [];
    } else {
      console.error('No hay productos seleccionados o los datos del cliente son nulos o no válidos');
    }
  }

  // Customer 

  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe({
      next: (v) => {
        this.customer = v;
        this.rfc = this.customer.rfc;

        this.customerData = {
          rfc: this.customer.rfc,
        };
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }

  increaseProduct(e: DtoCartDetails): void {
    this.addToCart(e, 1);
  }

  decreaseProduct(e: DtoCartDetails): void {
    this.addToCart(e, -1);
  }

  addToCart(e: DtoCartDetails, cantidad: number) {


    const nuevaCantidad = e.quantity + cantidad;

    if (nuevaCantidad === 0) {
      this.removeFromCart(e.cart_id);
      return;
    }

    // Verifica los límites antes de enviar la solicitud
    if (e.product.stock >= nuevaCantidad && nuevaCantidad >= 0) {
      const newItem = {
        rfc: e.rfc,
        gtin: e.product.gtin,
        quantity: cantidad,
      };

      this.cartService.addToCart(newItem).subscribe({
        next: (v) => {
          this.swal.successMessage(v.message);
          this.getCart();
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
      this.swal.errorMessage('¡Cantidad inválida!');
    }
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }
}