import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { STORAGE } from '../../constants/constants.core';
import { HttpClient } from '@angular/common/http';
import { ACTIONS, urlsApis } from 'src/environments/environment';
import { IAuth } from '../../interfaces/auth.interface';
import { ApiService } from '../general/api-service.service';
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public apiUrlUsers: string = urlsApis.users;

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _httpClient: HttpClient,
    private readonly _apiService: ApiService,
    private readonly _route: Router
  ) {}

  isLogged(): boolean {
    return !!this._localStorageService.getItem(STORAGE.TOKEN);
  }

  getCurrentUser(): any {
    return JSON.parse(this._localStorageService.getItem(STORAGE.USER));
  }

  setSession(data: IAuth): void {
    this._localStorageService.addItem(STORAGE.USER, JSON.stringify(data));
  }

  setSessionUser(data: IUser): void {
    this._localStorageService.addItem(STORAGE.USER, JSON.stringify(data));
  }

  setToken(token: string): void {
    this._localStorageService.addItem(STORAGE.TOKEN, token);
  }

  logout(): void {
    this.removeLocalStorage();
  }

  removeLocalStorage(): void {
    this._localStorageService.removeItem(STORAGE.TOKEN);
    this._localStorageService.removeItem(STORAGE.USER);
    this._localStorageService.clearStorage();
    this._route.navigate(['/auth/login']);
  }

  loginAccount(dataAccount: any): Promise<IAuth | undefined | null> {
    const data$ = this._httpClient
      .post<IAuth>(`${this.apiUrlUsers}/${ACTIONS.LOGIN}`, dataAccount)
      .toPromise();

    return data$
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  infoAccount(): Promise<IUser | null> {
    return this._apiService
      .post<IUser>(`${this.apiUrlUsers}/${ACTIONS.INFO}`, {})
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }
}
