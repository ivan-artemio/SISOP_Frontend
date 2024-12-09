import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProcessComponent } from './pages/process/process.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {
    path: 'Notificacion',
    data: {
      title: 'Notificacion',
      breadcrumb: 'Notificacion',
    },
    component: NotificationComponent,
  },
  {
    path: 'Proceso',
    data: {
      title: 'Proceso',
      breadcrumb: 'Proceso',
    },
    component: ProcessComponent,
  },
  {
    path: 'Materias', 
    data: {
      title: 'Materias',
      breadcrumb: 'Materias',
    },
    component: SubjectComponent,
  },
  {
    path: 'Proyectos',
    data: {
      title: 'Proyectos',
      breadcrumb: 'Proyectos',
    },
    component: ProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
