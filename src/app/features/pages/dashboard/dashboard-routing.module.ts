import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DependenciasComponent } from './dependencias/dependencias.component';
import { AgregarDependenciaComponent } from './agregar-dependencia/agregar-dependencia.component';
import { AreasComponent } from './areas/areas.component';
import { ConveniosComponent } from './convenios/convenios.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent,
        data: {
          title: 'Default',
          breadcrumb: 'default',
        },
      },
      {
        path: 'dependencias',
        component: DependenciasComponent,
        data: {
          title: 'Dependencias',
          breadcrumb: 'Dependencias',
        },
      },
      {
        path: 'agregar-dependencia',
        component: AgregarDependenciaComponent,
        data: {
          title: 'Agregar/Editar Dependencia',
          breadcrumb: 'Dependencias / Agregar - Editar',
        },
      },
      {
        path: 'areas',
        component: AreasComponent,
        data: {
          title: 'Áreas',
          breadcrumb: 'Áreas',
        },
      },
      {
        path: 'convenios',
        component: ConveniosComponent,
        data: {
          title: 'Convenios',
          breadcrumb: 'convenios',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
