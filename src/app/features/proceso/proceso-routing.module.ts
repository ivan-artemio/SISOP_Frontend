import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesoComponent } from './proceso.component';

const routes: Routes = [
  {
    path: '',
    component: ProcesoComponent,
    data: {
      title: 'Proceso',
      breadcrumb: 'proceso',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesoRoutingModule {}
