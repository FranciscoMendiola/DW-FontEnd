import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Customer } from '../../_model/customer';
import { CustomerImage } from '../../_model/customer-image';
import { CustomerImageService } from '../../_service/customer-image.service';
import { CustomerService } from '../../_service/customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';

declare var $: any; // JQuery

@Component({
  selector: 'app-customer-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer-image.component.html',
  styleUrl: './customer-image.component.css'
})

export class CustomerImageComponent {

  customer: any | Customer = new Customer; // customer
  rfc: any | number = 0;
  regions: Region[] = []; // region list
  region: any | Region = new Region();

  isAdmin = false;

  form: any;

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private customerImageService: CustomerImageService,
    private service: NgxPhotoEditorService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user")) {

      let user = JSON.parse(localStorage.getItem("user")!);

      if (user.rol == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if (this.rfc) {
      this.getCustomer();
      this.getActiveRegions();
    } else {
      this.swal.errorMessage("¡Cliente Inexistente!");
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
    this.customerService.updateCustomer(this.form.value, this.customer.customer_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message

        if (this.form.controls['rfc'].value != this.rfc) {
          this.rfc = this.form.controls['rfc'].value!;

          let currentURL = this.router.url.split("/");
          currentURL.pop();
          currentURL.push();

          this.redirect(currentURL);
        }

        this.getCustomer();

        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getCustomer() {
    this.customerService.getCustomer(this.rfc).subscribe({
      next: (v) => {
        this.customer = v.body!;
        this.getRegion(this.customer.region_id);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateCustomer() {
    this.form.reset();
    this.form.controls['name'].setValue(this.customer.name);
    this.form.controls['surname'].setValue(this.customer.surname);
    this.form.controls['rfc'].setValue(this.customer.rfc);
    this.form.controls['mail'].setValue(this.customer.mail);
    this.form.controls['region_id'].setValue(this.customer.region_id);
    this.form.controls['address'].setValue(this.customer.address);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  uploadCustomerImage(image: string) {
    let customerImage = new CustomerImage();
    customerImage.image = image;
    customerImage.customer_image_id = this.customer.image.customer_image_id;

    this.customerImageService.updateCustomerImage(customerImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCustomer();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.uploadCustomerImage(data.base64!);
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

  // Region

  getRegion(region_id: number) {
    this.regionService.getRegion(region_id).subscribe({
      next: (v) => {
        this.region = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

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