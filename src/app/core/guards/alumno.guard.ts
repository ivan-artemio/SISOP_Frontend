import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnoGuard {
  constructor(
    private router: Router,
    private readonly _localStorage: LocalStorageService,
    private readonly _authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this._authService.isLogged();
    const user = this._authService.getCurrentUser(); // Asegúrate de tener este método en tu servicio de autenticación para obtener el usuario actual

    if (!isLogged) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Verificar si el usuario es un alumno
    if (user && user.role === 'alumno') {
      return true;
    } else {
      this.router.navigate(['/dashboard']); // Redirige a otra ruta si no es alumno
      return false;
    }
  }
}
