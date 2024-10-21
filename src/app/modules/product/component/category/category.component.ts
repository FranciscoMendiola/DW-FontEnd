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
  categories: any = [];
 
  submitted = false; // form submitted
  swal: SwalMessages = new SwalMessages(); // swal messages
  form: any;
  modal:String="normal";
  id:any =null;

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

    this.submitted =true;
    if(this.form.invalid)return;
    this.submitted=false;

      if(this.modal=="normal")      this.onSubmitCreate();
      else                          this.onSubmitUpdate();
    
    this.modal="normal";
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next:(v) =>{  
        this.swal.successMessage("La categoria ha sido creada");
        this.getCategories();
        this.hideModalForm();
      
      },
      error: (e) =>{
        this.swal.errorMessage("No se pudo crear la categoria "+e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value,this.id).subscribe({
      next:(v) => {
        this.swal.successMessage("La categoria ha sido actualizada");
        this.getCategories();
        this.hideModalForm();
        this.modal ="normal";
      }, error: (e)=>{
        this.swal.errorMessage("No se pudo actualizar la categoria. "+e.error.message); 
      }
    });
  }



  getCategories(){
    return this.categoryService.getCategories().subscribe({
      next:(v)=>{
        this.categories=v;
        console.log(v);
      },
      error:(e)=>{
        this.swal.errorMessage("No hay categorias ");
      }
    });
  }

  updateCategory(category:Category){
    this.modal = "update";
    this.id = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

 
  enableCategory(id:number){
    this.categoryService.activateCategory(id).subscribe({
      next:(v)=>{
        this.swal.successMessage("La categoria ha sido activada");
        this.getCategories();

      },error:(e)=>{
        this.swal.errorMessage("No se pudo activar la categoria"); 
      }
    });
  }

  disableCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe({
      next:(v)=>{
        this.swal.successMessage("La categoria ha sido eliminada");
        this.getCategories();

      },error:(e)=>{
        this.swal.errorMessage("No se pudo eliminar la categoria"); 
      }
    });
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