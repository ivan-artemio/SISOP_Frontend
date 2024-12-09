import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'notificaciones',
    data: {
      title: 'Notificaciones',
      breadcrumb: 'Notificaciones',
    },
    loadChildren: () =>
      import('./pages/notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: 'solicitudes',
    data: {
      title: 'Solicitudes',
      breadcrumb: 'Solicitudes',
    },
    loadChildren: () =>
      import('./pages/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'catalogos',
    data: {
      title: 'Catálogos',
      breadcrumb: 'Catalogos',
    },
    loadChildren: () =>
      import('./pages/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'configuraciones',
    data: {
      title: 'Configuración',
      breadcrumb: 'Config',
    },
    loadChildren: () =>
      import('./pages/config/config.module').then((m) => m.ConfigModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
