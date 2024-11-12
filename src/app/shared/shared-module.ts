import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importa FontAwesomeModule
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule,FontAwesomeModule,NgxPaginationModule  ],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule,FontAwesomeModule,NgxPaginationModule  ],
})
export class SharedModule{}