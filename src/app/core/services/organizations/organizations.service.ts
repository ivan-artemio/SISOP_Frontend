import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';
import { ApiService } from '../general/api-service.service';
import { OrganizationDTO } from '../../interfaces/organization.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  public apiUrlOrganizations: string = urlsApis.organizations;

  constructor(private readonly _apiService: ApiService) {}

  getAll(): Promise<OrganizationDTO[] | null> {
    return this._apiService
      .get<OrganizationDTO[]>(`${this.apiUrlOrganizations}`, {})
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

  postCreate(data: OrganizationDTO): Promise<OrganizationDTO | null> {
    return this._apiService
      .post<OrganizationDTO>(`${this.apiUrlOrganizations}`, data)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  patchUpdate(data: OrganizationDTO): Promise<OrganizationDTO | null> {
    return this._apiService
      .patch<OrganizationDTO>(`${this.apiUrlOrganizations}/${data.id}`, data)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  deleteRemove(data: OrganizationDTO): Promise<OrganizationDTO | null> {
    return this._apiService
      .delete<OrganizationDTO>(`${this.apiUrlOrganizations}/${data.id}`)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }
}
