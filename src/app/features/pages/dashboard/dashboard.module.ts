import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from 'ngx-slider-v2';

import { DefaultComponent } from './default/default.component';

// Dependencias component
import { DependenciasComponent } from "./dependencias/dependencias.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
// Agregar dependencia
import { AgregarDependenciaComponent } from "./agregar-dependencia/agregar-dependencia.component";
// Areas
import { AreasComponent } from './areas/areas.component';
// Convenios
import { ConveniosComponent } from "./convenios/convenios.component";

@NgModule({
  declarations: [
    DefaultComponent,
    DependenciasComponent,
    AgregarDependenciaComponent,
    AreasComponent,
    ConveniosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    SharedModule,
    NgxSliderModule,
    NgbDatepickerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DialogModule
  ],
  exports: [],
})
export class DashboardModule {}
