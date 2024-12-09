import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { InfoStudentComponent } from './pages/info-student/info-student.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Solicitudes',
      breadcrumb: 'Solicitudes',
    },
    component: StudentComponent,
  },
  {
    path: ':idApplication',
    data: {
      title: 'Información del Alumno',
      breadcrumb: 'Información',
    },
    component: InfoStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
