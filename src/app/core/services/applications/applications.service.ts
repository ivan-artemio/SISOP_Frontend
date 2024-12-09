import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';
import { ApiService } from '../general/api-service.service';
import { ApplicationDTO } from '../../interfaces/application.interface';


@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {
  
  public apiUrlApplications: string = urlsApis.applications;

  constructor(private readonly _apiService: ApiService) { }


  getAll(): Promise<ApplicationDTO[] | null> {
    return this._apiService
      .get<ApplicationDTO[]>(`${this.apiUrlApplications}`, {})
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }
  
  getById(id: number): Promise<ApplicationDTO | null> {
    return this._apiService
      .get<ApplicationDTO>(`${this.apiUrlApplications}/${id}`, {})
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  updateStatus(id: number, status: 'ACCEPTED' | 'REJECTED', actionDate: string): Promise<any> {
    return this._apiService
      .put(`${this.apiUrlApplications}/${id}`, { status, actionDate })
      .then((data) => data)
      .catch((error) => {
        console.error('Error updating status:', error);
        throw error;
      });
  }

  


}


