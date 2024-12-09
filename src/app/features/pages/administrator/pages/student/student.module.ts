import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './pages/student/student.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { InfoStudentComponent } from './pages/info-student/info-student.component';
import { ProcesoModule } from 'src/app/features/proceso/proceso.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StudentComponent, InfoStudentComponent],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule,
    TableModule,
    TagModule,
    RatingModule,
    FormsModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    ContextMenuModule,
    ButtonModule,
    TooltipModule,
    ConfirmPopupModule,
    ProcesoModule,
    AngularEditorModule,
    NgxPrintModule,
    NgxDropzoneModule,
  ],
  providers: [ConfirmationService],
})
export class StudentModule {}
