import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IAuth, TYPE_USER } from 'src/app/core/interfaces/auth.interface';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup;
  public apiUrl: string = environment.apiUrl;

  constructor(
    public router: Router,
    private readonly _authService: AuthenticationService,
    private messageService: MessageService
  ) {
    const userData = this._authService.isLogged();
    if (userData) {
      router.navigate(['/dashboard/default']);
    }
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('1925411@uqroo.mx', [Validators.required]),
      password: new FormControl('berlin88$', [Validators.required]),
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  async login(student: boolean = false): Promise<void> {
    if (this.loginForm.invalid) return;

    const result: IAuth = await this._authService
      .loginAccount(this.loginForm.value)
      .then((data) => {
        return data!;
      });

    result.typeUser = student ? TYPE_USER.STUDENT : TYPE_USER.ADMIN;
    this._authService.setToken(result.data);
    const data = await this._authService.infoAccount();
    if (data !== null) {
      data.typeUser = result.typeUser;
      this._authService.setSessionUser(data);

      this.messageService.add({
        severity: 'success',
        summary: 'Bienvenido',
        detail: 'Bienvenido(a)',
      });
      

      this.router.navigate(['/registro/seleccion-materia']);
      //this.router.navigate(['/dashboard/default']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error en login',
        detail: 'Error al intentar realizar el inicio de sesión',
      });
      this._authService.logout();
    }
  }

  redirectMS(): void {
    window.location.href = `${this.apiUrl}/users/microsoft/redirect`;
  }
}
