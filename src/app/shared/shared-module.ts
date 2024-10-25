import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule ],
    exports: [FormsModule, ReactiveFormsModule, CommonModule ],
})
export class SharedModule{}