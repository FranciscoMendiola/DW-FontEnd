import { Component } from '@angular/core';
import { CustomerService } from '../../../customer/_service/customer.service';
import { InvoiceService } from '../../_service/invoice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../product/_model/product';
import { ProductImage } from '../../../product/_model/product-image';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductService } from '../../../product/_service/product.service';
import { PagingConfig } from '../../../../shared/paging-config';
import { SharedModule } from '../../../../shared/shared-module';
import { Customer } from '../../../customer/_model/customer';
import { DtoCartDetails } from '../../_dto/dto-cart-details';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})

export class BuyComponent {

  customer: Customer = new Customer(); // customer
  rfc: any | number = 0;

  products: DtoCartDetails[] = [];
  product: Product = new Product(); // product
  gtin: any | string = "";

  images: any | ProductImage[] = []; // product images

  subtotal: number = 0;
  total: number = 0;
  iva: number = 0;

  page: number | Event = 1;

  swal: SwalMessages = new SwalMessages(); // Swal messages

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private router: Router,
  ) { }

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState && navigationState.products && navigationState.customer) {
      this.products = navigationState.products;
      this.rfc = navigationState.customer.rfc;
      this.getCustomer();

      this.products.forEach(product => {
        this.gtin = product.gtin;
        this.getProduct();
      });

      this.calculateTotal();
    } else {
      console.error('Los datos del producto y/o cliente no están disponibles');
      this.swal.errorMessage('¡Los datos son inválidos para realizar la compra!');
    }

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  confirmPurchase() {
    this.swal.confirmMessage.fire({
      title: '¿Deseas continuar con la compra?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.customer.address === '') {
          this.swal.errorMessage("La dirección de envió esta vacía");
          return;
        }
        Swal.fire({
          imageUrl: 'assets/loading.gif',
          imageWidth: 350,
          imageHeight: 300,
          imageAlt: 'loading icon',
          background: '#ecf0ef',
          color: '#013a55',
          title: "Realizando la compra...",
          text: "Espera un momento",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.swal.successMessage('¡Compra realizada exitosamente!');
          this.generateInvoice();
        }, 4000);
      }
    });
  }

  calculateTotal() {
    this.products.forEach(product => {
      this.total += product.quantity * product.product.price;
    });

    this.iva = this.total * 0.16;
    this.subtotal = this.total - (this.iva);
  }

  generateInvoice() {
    this.invoiceService.generateInvoice(this.rfc).subscribe({
      next: (v) => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Product

  getProduct() {
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.getProductImages(this.product.product_id);
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
        this.images = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Customer 

  getCustomer() {
    this.customerService.getCustomer(this.rfc).subscribe({
      next: (v) => {
        this.customer = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }
}