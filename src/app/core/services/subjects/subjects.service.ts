import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
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
