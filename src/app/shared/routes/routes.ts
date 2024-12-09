import { Routes } from '@angular/router';

export const dashData: Routes = [
  {
    path: 'dashboard',
    data: {
      title: 'dashboard',
      breadcrumb: 'Dashboard',
    },
    loadChildren: () =>
      import('../../features/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'administrador',
    data: {
      title: 'administrador',
      breadcrumb: 'Administrador',
    },
    loadChildren: () =>
      import('../../features/pages/administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('../../features/registro/registro.module').then(
        (m) => m.RegistroModule
      ),
  },
  {
    path: 'proceso',
    loadChildren: () =>
      import('../../features/proceso/proceso.module').then(
        (m) => m.ProcesoModule
      ),
  },
  {
    path: 'carreras',
    loadChildren: () =>
      import('../../features/carreras/carreras.module').then(
        (m) => m.CarrerasModule
      ),
  },
];
