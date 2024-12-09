import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { ProcesoComponent } from './proceso.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PanelContenidoComponent } from './panel-contenido/panel-contenido.component';
import { PrecartaPresentacionComponent } from './pasos/precarta-presentacion/precarta-presentacion.component';
import { CartaPresentacionComponent } from './pasos/carta-presentacion/carta-presentacion.component';
import { CartaAceptacionComponent } from './pasos/carta-aceptacion/carta-aceptacion.component';
import { ReporteComponent } from './pasos/reporte/reporte.component';
import { ReporteFinalComponent } from './pasos/reporte-final/reporte-final.component';
import { CartaCulminacionComponent } from './pasos/carta-culminacion/carta-culminacion.component';
import { OficioTerminoComponent } from './pasos/oficio-termino/oficio-termino.component';
import { ButtonModule } from 'primeng/button';
import { EsperandoValidacionComponent } from './pasos/esperando-validacion/esperando-validacion.component';

@NgModule({
  declarations: [
    ProcesoComponent,
    MenuLateralComponent,
    PanelContenidoComponent,
    PrecartaPresentacionComponent,
    CartaPresentacionComponent,
    CartaAceptacionComponent,
    ReporteComponent,
    ReporteFinalComponent,
    CartaCulminacionComponent,
    OficioTerminoComponent,
    EsperandoValidacionComponent,
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxPrintModule,
    NgxDropzoneModule,
    ButtonModule,
  ],
  exports: [MenuLateralComponent],
})
export class ProcesoModule {}
