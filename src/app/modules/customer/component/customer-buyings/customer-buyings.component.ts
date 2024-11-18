import { Component } from '@angular/core';
import { Customer } from '../../_model/customer';
import { CustomerService } from '../../_service/customer.service';
import { DtoInvoiceList } from '../../../invoice/_dto/dto-invoice-list';
import { InvoiceService } from '../../../invoice/_service/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { PagingConfig } from '../../../../shared/paging-config';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-customer-buyings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer-buyings.component.html',
  styleUrl: './customer-buyings.component.css'
})

export class CustomerBuyingsComponent {

  isAdmin = false;

  customer: any | Customer = new Customer();
  rfc: any | string = "";

  invoices: DtoInvoiceList[] = []; // Invoice list

  page: number | Event = 1;

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
  ) { }

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if (this.rfc) {
      this.getCustomer();
      this.getInvoices();
    } else {
      this.swal.errorMessage("¡Cliente Inexistente!");
    }

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  // Customer 

  getCustomer() {
    this.customerService.getCustomer(this.rfc).subscribe({
      next: (v) => {
        this.customer = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // Invoice

  getInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}