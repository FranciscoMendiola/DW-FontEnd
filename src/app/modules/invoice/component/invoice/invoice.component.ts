import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { InvoiceService } from '../../_service/invoice.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { PagingConfig } from '../../../../shared/paging-config';
import { SharedModule } from '../../../../shared/shared-module';
import { Router } from '@angular/router';
declare var $: any; // JQuery

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent {

  invoices: DtoInvoiceList[] = []; // Invoice list
  swal: SwalMessages = new SwalMessages(); // swal messages

  page: number | Event = 1;

  loading = false; // loading request
  current_date = new Date(); // hora y fecha actual
  isAdmin = false;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
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

      this.current_date = new Date(); // hora y fecha actual
      this.getInvoices();

      this.pageConfig = {
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        totalItems: this.totalItems
      }
    }
  }

  getInvoices() {
    this.loading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No fue posible recuperar las facturas"); // show message
        this.loading = false;
      }
    });
  }
}