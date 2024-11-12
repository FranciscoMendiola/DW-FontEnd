import { Component } from '@angular/core';
import { CustomerService } from '../../_service/customer.service';
import { DtoCustomerList } from '../../_dto/dto-customer-list';
import { FormBuilder, Validators } from '@angular/forms';
import { Region } from '../../_model/region/region';
import { RegionService } from '../../_service/region.service';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { PagingConfig } from '../../../../shared/paging-config';
import { SharedModule } from '../../../../shared/shared-module';

declare var $: any; // JQuery

@Component({
  selector: 'app-customer',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})

export class CustomerComponent {

  customers: DtoCustomerList[] = []; // customer list
  regions: Region[] = []; // region list

  page: number | Event = 1;

  form: any;


  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private router: Router,
  ) { }

  currentPage: number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  pageConfig: PagingConfig = {} as PagingConfig;

  ngOnInit() {
    this.getCustomers();
    this.getActiveRegions();

    this.pageConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }

    // Customer form
  this.form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
  });
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    this.customerService.createCustomer(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCustomers(); // reload customers
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (v) => {
        this.customers = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  disableCustomer(customer_id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la desactivación del cliente',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customerService.disableCustomer(customer_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCustomers(); // reload customers
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableCustomer(customer_id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación del cliente',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customerService.enableCustomer(customer_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCustomers(); // reload customers
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  } 

  showCustomerDetails(rfc: string) {
    this.router.navigate(['customer/' + rfc]);
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

  getActiveRegions() {
    this.regionService.getActiveRegions().subscribe({
      next: (v) => {
        this.regions = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}