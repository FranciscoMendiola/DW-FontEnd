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

  // Lista de categorías
  categories: Category[] = [];

  submitted = false; // form submitted
  swal: SwalMessages = new SwalMessages(); // swal messages
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
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

    // creamos nueva categoria y la agrega a la lista
    let id = this.categories.length + 1;
    let category = new Category(id, this.form.controls['category'].value!, this.form.controls['tag'].value!, 1);
    this.categories.push(category);

    // reseteamos el formulario
    this.hideModalForm();
    this.form.reset();
    this.swal.successMessage("¡La categoría ha sido registrada!");
  }


  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }


  showModalForm() {
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }
}
