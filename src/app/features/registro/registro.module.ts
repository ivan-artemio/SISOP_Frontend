import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { RegistroRoutingModule } from './registro-routing.module';
import { ProyectosListaComponent } from './components/proyectos-lista/proyectos-lista.component';
import { ValidarCreditosComponent } from './components/validar-creditos/validar-creditos.component';
import { ValidarCreditosErrorComponent } from './components/validar-creditos-error/validar-creditos-error.component';
import { SeleccionMateriaComponent } from './components/seleccion-materia/seleccion-materia.component';
import { PreguntaCartaPreliminarComponent } from './components/pregunta-carta-preliminar/pregunta-carta-preliminar.component';


@NgModule({
  declarations: [ProyectosListaComponent, ValidarCreditosComponent, ValidarCreditosErrorComponent, SeleccionMateriaComponent, PreguntaCartaPreliminarComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ]
})
export class RegistroModule { }
