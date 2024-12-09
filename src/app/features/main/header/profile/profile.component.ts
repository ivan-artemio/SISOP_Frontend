import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE } from 'src/app/core/constants/constants.core';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public user: IUser = {} as IUser;
  constructor(
    private router: Router,
    private readonly _localStorage: LocalStorageService,
    private readonly _authService: AuthenticationService
  ) {
    this.user = JSON.parse(this._localStorage.getItem(STORAGE.USER)) as IUser;
  }

  public show: boolean = false;

  open() {
    this.show = !this.show;
  }

  logOut() {
    this._authService.logout();
  }
}
