import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuración',
      breadcrumb: 'Config',
    },
    component: ConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
