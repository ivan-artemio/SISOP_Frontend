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
export class AdminGuard {
  public url: any;
  constructor(
    public router: Router,
    private readonly _localStorage: LocalStorageService,
    private readonly _authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.url = this.router.url;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    // let user = JSON.parse(this._localStorage.getItem('ppsAccess') || '{}');
    const isLogged = this._authService.isLogged();
    if (!isLogged) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    // else if (user) {
    //   if (!Object.keys(user).length) {
    //     this.router.navigate(['/auth/login']);
    //     return false;
    //   }
    // }
    return true;
  }
}
