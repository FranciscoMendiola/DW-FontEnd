import { Component } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any; // jquery

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = []; // lista de categorias
  category_id = 0; // id de categoría a actualizar
  current_date = new Date(); // hora y fecha actua
  form: any;
  loading = false; // loading request
  submitted = false; // form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();

    // formulario categoría
    this.form = this.formBuilder.group({
      category: ["", [Validators.required]],
      tag: ["", [Validators.required]],
    });
  }

  disableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCategories();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });


  }

  enableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCategories();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });


  }

  getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        // console.log(v);
        this.categories = v.sort((a: { category_id: number; }, b: { category_id: number; }) => a.category_id - b.category_id);
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });

  }

  onSubmit() {

    // validación del formulario 
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.submitted = false;

    // valida si se está registrando o actualizando una categoría
    if (this.category_id == 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.category_id).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  updateCategory(category: Category) {
    this.resetVariables();
    this.showModalForm();

    this.category_id = category.category_id;
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);
  }


  // modal 

  showModalForm() {
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // aux 

  resetVariables() {
    this.form.reset();
    this.submitted = false;
    this.category_id = 0;
  }
}
