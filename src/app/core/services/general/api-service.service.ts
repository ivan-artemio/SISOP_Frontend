import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  get<T>(route: string, params: any): Promise<T> {
    const $response = this._httpClient
      .get<ApiResponse<T>>(route, {
        params: this.queryParametersObject(params),
      })
      .pipe(map((res) => res.data));
    return lastValueFrom($response);
  }

  post<T>(route: string, params: any): Promise<T> {
    const $response = this._httpClient
      .post<ApiResponse<T>>(route, this.queryParametersObject(params))
      .pipe(map((res) => res.data));
    return lastValueFrom($response);
  }

  patch<T>(route: string, params: any): Promise<T> {
    const $response = this._httpClient
      .patch<ApiResponse<T>>(route, this.queryParametersObject(params))
      .pipe(map((res) => res.data));
    return lastValueFrom($response);
  }

  put<T>(route: string, params: any): Promise<T> {
    const $response = this._httpClient
      .put<ApiResponse<T>>(route, this.queryParametersObject(params))
      .pipe(map((res) => res.data));
    return lastValueFrom($response);
  }
  

  delete<T>(route: string): Promise<T> {
    const $response = this._httpClient
      .delete<ApiResponse<T>>(route)
      .pipe(map((res) => res.data));
    return lastValueFrom($response);
  }

  queryParametersObject(params: any) {
    if (!params) {
      return {};
    }
    const queryParams: any = {};
    for (const key in params) {
      let value: string = params[key];
      queryParams[key] = value;
    }
    return queryParams;
  }
}
