import { NgModule } from '@angular/core';
import { CarreraListaComponent } from './components/carreras-lista/carreras-lista.component';
import { ArchivosListaComponent } from './components/archivos-lista/archivos-lista.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'carreras-lista',
        component: CarreraListaComponent,
        data: {
          title: "Lista de carreras",
          breadcrumb: "Lista de carreras",
        }
      },
      {
        path: 'archivos-lista/:idCarrera',
        component: ArchivosListaComponent,
        data: {
          title: "Lista de documentos",
          breadcrumb: "Lista de documentos",
        }
      },
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild([
//       { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
//       { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
//       { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
//       { path: 'test-page-1', loadChildren: () => import('./test-page-1/test-page-1.module').then(m => m.TestPage1Module) },
//       { path: '**', redirectTo: '/notfound' },
      
//   ])],
//   exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrerasRoutingModule { }
