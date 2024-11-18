import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { PagingConfig } from '../../../../shared/paging-config';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})

export class RegionComponent {

  regions: Region[] = []; // Region List

  regionToUpdate: number = 0; // Region id to update

  page: number | Event = 1;

  form: any;

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // Swal messages

  loading = false; // loading request
  current_date = new Date(); // hora y fecha actual
  isAdmin = false;

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder,
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

      this.current_date = new Date();
      this.getRegions();

      this.pageConfig = {
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        totalItems: this.totalItems
      }

      // Region form
      this.form = this.formBuilder.group({
        region: ["", [Validators.required]],
        tag: ["", [Validators.required]],
      });
    }
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;


    // validate regionToUpdate
    if (this.regionToUpdate == 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    // add region to region list
    this.regionService.createRegion(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getRegions(); // reload regions
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmitUpdate() {
    // add region to region list
    this.regionService.updateRegion(this.form.value, this.regionToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getRegions(); // reload regions
        this.hideModalForm(); // close modal
        this.regionToUpdate = 0; // reset regionToUpdate
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getRegions() {
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (v) => {
        this.regions = v.sort((a: { region_id: number; }, b: { region_id: number; }) => a.region_id - b.region_id);
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No fue posible recuperar las regiones"); // show message
        this.loading = false;
      }
    });
  }

  updateRegion(region: Region) {
    this.regionToUpdate = region.region_id;

    this.form.reset();
    this.form.controls['region'].setValue(region.region);
    this.form.controls['tag'].setValue(region.tag);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  disableRegion(region_id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la desactivación de la región',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.regionService.disableRegion(region_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); // show message
            this.getRegions(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableRegion(region_id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la región',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.regionService.enableRegion(region_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); // show message
            this.getRegions(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  showModalForm() {
    this.form.reset();
    this.regionToUpdate = 0; // reset regionToUpdate
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }
}