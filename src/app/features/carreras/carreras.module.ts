import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrerasRoutingModule } from './carreras-routing.module';
import { CarreraListaComponent } from './components/carreras-lista/carreras-lista.component';
import { ArchivosListaComponent } from './components/archivos-lista/archivos-lista.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RouterLinkWithHref } from '@angular/router';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [CarreraListaComponent, ArchivosListaComponent],
  providers: [MessageService, ConfirmationService, RouterModule],
  imports: [
    CommonModule,
    CarrerasRoutingModule,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    RouterLinkWithHref,
    CardModule,
  ],
  exports: [CarreraListaComponent, ArchivosListaComponent],
})
export class CarrerasModule {}
