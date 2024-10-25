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
  form: any;
  current_date = new Date(); // hora y fecha actua
  loading = false; // loading request
  submitted = false; // form submitted
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();

    // Inicializacion el formulario en ngOnInit
    this.form = this.formBuilder.group({
      category: ["", [Validators.required]],
      tag: ["", [Validators.required]],
    });
  }

  onSubmit() {

    // validación del formulario 
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.submitted = false;

    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        console.log(v);
        this.getCategories();
        this.hideModalForm();
        this.form.reset();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        // console.log(v);
        this.categories = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  // modal 

  showModalForm() {
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }
}
