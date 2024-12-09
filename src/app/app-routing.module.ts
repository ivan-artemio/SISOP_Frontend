import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashData } from './shared/routes/routes';
import { AdminGuard } from './core/guards/admin.guard';
//import { AlumnoGuard } from './core/guards/alumno.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { ContentComponent } from './features/main/layout/content/content.component';
import { fullRoutes } from './shared/routes/full-routes';
import { FullComponent } from './features/main/layout/full/full.component';
import { MsAuthComponent } from './features/auth/ms-auth/ms-auth.component';
import { ValidarCreditosErrorComponent } from './features/registro/components/validar-creditos-error/validar-creditos-error.component';
import { ValidarCreditosComponent } from './features/registro/components/validar-creditos/validar-creditos.component';
import { SeleccionMateriaComponent } from './features/registro/components/seleccion-materia/seleccion-materia.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/default',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'ms-auth',
    component: MsAuthComponent,
  },
  {
    path: '',
    component: ContentComponent,
    children: dashData,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: fullRoutes,
  },
  {
    path: 'registro/validar-creditos-error',
    component: ValidarCreditosErrorComponent,
  },
  {
    path: 'registro/validar-creditos',
    component: ValidarCreditosComponent,
  },
  {
    path: 'registro/seleccion-materia',
    component: SeleccionMateriaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
