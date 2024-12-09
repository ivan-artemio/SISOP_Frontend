import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TYPE_USER } from 'src/app/core/interfaces/auth.interface';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-ms-auth',
  templateUrl: './ms-auth.component.html',
  styleUrl: './ms-auth.component.scss',
})
export class MsAuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly _authService: AuthenticationService,
    private messageService: MessageService,
    private readonly _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const token: string = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (token) {
      this._authService.setToken(token);
      const data = await this._authService.infoAccount();

      if (data !== null) {
        data.typeUser = TYPE_USER.ADMIN;
        this._authService.setSessionUser(data);
        this._router.navigate(['/dashboard/default']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al iniciar sesión',
        });
        this._authService.logout();
      }
    } else {
      this._authService.logout();
    }
  }
}
