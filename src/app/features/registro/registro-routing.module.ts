import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosListaComponent } from './components/proyectos-lista/proyectos-lista.component';
import { ValidarCreditosComponent } from './components/validar-creditos/validar-creditos.component';
import { ValidarCreditosErrorComponent } from './components/validar-creditos-error/validar-creditos-error.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'proyectos-lista',
        component: ProyectosListaComponent,
        data: {
          title: "Lista de proyectos disponibles",
          breadcrumb: "Lista de proyectos ",
        }
      },
      /*{
        path: 'validar-creditos',
        component: ValidarCreditosComponent,
        data: {
          title: "Lista de archivos",
          breadcrumb: "Lista de archivos",
        }
      },*/
      /*{
        path: 'validar-creditos-error',
        component: ValidarCreditosErrorComponent,
        data: {
          title: "Lista de archivos",
          breadcrumb: "Lista de archivos",
        }
      },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }


