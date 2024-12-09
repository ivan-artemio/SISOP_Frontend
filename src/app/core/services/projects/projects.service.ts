//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlsApis } from 'src/environments/environment';
import { ApiService } from '../general/api-service.service';
import { ProjectDTO } from '../../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})

export class ProjectsService {
  public apiUrlProjects: string = urlsApis.projects;

  constructor(private readonly _apiService: ApiService) {}

  getAll(): Promise<ProjectDTO[] | null> {
    return this._apiService
      .get<ProjectDTO[]>(`${this.apiUrlProjects}`, {})
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

  postCreate(data: ProjectDTO): Promise<ProjectDTO | null> {
    return this._apiService
      .post<ProjectDTO>(`${this.apiUrlProjects}`, data)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  putUpdate(data: ProjectDTO): Promise<ProjectDTO | null> {
    return this._apiService
      .put<ProjectDTO>(`${this.apiUrlProjects}/${data.id}`, data)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }

  deleteRemove(data: ProjectDTO): Promise<ProjectDTO | null> {
    return this._apiService
      .delete<ProjectDTO>(`${this.apiUrlProjects}/${data.id}`)
      .then((data) => {
        return data;
      })
      .catch((_) => {
        return null;
      });
  }
}
