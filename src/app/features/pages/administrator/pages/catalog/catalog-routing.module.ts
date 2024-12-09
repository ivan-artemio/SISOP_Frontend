import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { PeriodsComponent } from './periods/periods.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: 'dependencias',
    data: {
      title: 'Dependencias',
      breadcrumb: 'Dependencias',
    },
    component: DependenciesComponent,
  },
  {
    path: 'periodos',
    data: {
      title: 'Periodos',
      breadcrumb: 'Periodos',
    },
    component: PeriodsComponent,
  },
  {
    path: 'programas',
    data: {
      title: 'Programas',
      breadcrumb: 'Programas',
    },
    component: ProgramsComponent,
  },
  {
    path: 'proyectos',
    data: {
      title: 'Proyectos',
      breadcrumb: 'Proyectos',
    },
    component: ProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
