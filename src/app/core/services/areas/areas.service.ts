import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';
import { ApiService } from '../general/api-service.service';
import { AreaDTO } from '../../interfaces/area.interface';


@Injectable({
  providedIn: 'root',
})
export class AreasService {
  public apiUrlAreas: string = urlsApis.areas;

  constructor(private readonly _apiService: ApiService) {}

  getAll(): Promise<AreaDTO[] | null> {
    return this._apiService
      .get<AreaDTO[]>(`${this.apiUrlAreas}`, {})
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

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
