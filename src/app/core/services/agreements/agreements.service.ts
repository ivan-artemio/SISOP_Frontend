import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AgreementsService {
  public apiUrlUsers: string = urlsApis.users;

  constructor(private readonly _httpClient: HttpClient) {}

  getOne(): null {
    return null;
  }

  postCreate(): null {
    return null;
  }

  patchUpdate(): null {
    return null;
  }

  deleteRemove(): null {
    return null;
  }
}
