import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Area,
  ClaveValor,
  Convenio,
  Dependencia,
} from '../interface/dependencia';
import { urlsApis } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // Esto asegura que el servicio sea un singleton a nivel de toda la app
})
export class GlobalDependenciaService {
  //private apiUrl = 'tu_api_url'; // URL base de tu API
  private apiUrl: string = urlsApis.api;
  public dependencias: Dependencia[];
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb3NlLmt1LnNhbGF6YXJAdXFyb28uZWR1Lm14IiwiaWF0IjoxNzE0MDY4MzIwLCJleHAiOjE3MTQxNTQ3MjB9.d8WZKiyp4BHXaE155TJQrxgycgvQq7Sb-WsaTPXX5EE';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.token,
    }),
  };
  constructor(private http: HttpClient) {}

  getCatalogos(): Observable<any> {
    let catalogos: any;
    let paises: any;
    let estados: any;
    let municipios: any;
    let ciudades: any;
    let estatus: any;
    let tipos: any;

    paises = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-paises/`)
      .pipe(map((res) => res.data));
    estados = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-estados/`)
      .pipe(map((res) => res.data));
    municipios = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-municipios/`)
      .pipe(map((res) => res.data));
    ciudades = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-ciudades/`)
      .pipe(map((res) => res.data));
    estatus = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-estatus/`)
      .pipe(map((res) => res.data));
    tipos = this.http
      .get<{ data: ClaveValor[] }>(`${this.apiUrl}/catalogo-tipos/`)
      .pipe(map((res) => res.data));

    catalogos = [paises, estados, municipios, ciudades, estatus, tipos];

    return catalogos;
  }

  /* getDependencias(): Observable<Dependencia[]> {
        // Ajusta la URL según tu endpoint específico
        //return this.http.get<{data: Dependencia[]}>(`${this.apiUrl}/dependencias`)
        return this.http.get<{data: Dependencia[]}>('assets/demo/data/dependencias.json')
            .pipe(map(res => res.data));
    } */

  // # - - - - - - - - DEPENDENCIAS / ORGANIZACIONES- - - - - - - - - - - - - - - - - - - -
  getDependencias(): Observable<Dependencia[]> {
    return this.http
      .get<{
        success: boolean;
        message: string;
        data: Dependencia[];
        errors: any;
      }>(`${this.apiUrl}/organizations`, this.httpOptions)
      .pipe(map((response) => response.data || []));
  }

  getDependenciaById(id: number): Observable<Dependencia> {
    return this.http
      .get<{
        success: boolean;
        message: string;
        data: Dependencia;
        errors: any;
      }>(`${this.apiUrl}/organizations/${id}`, this.httpOptions)
      .pipe(map((response) => response.data || []));
  }

  agregarDependencias(datos: any): Observable<Dependencia> {
    let d = {
      rfc: datos.rfc,
      name: datos.nombre,
      responsible: datos.responsable,
      address: datos.direccion,
      phone: datos.telefono,
      acronym: datos.acronimo,
    };

    return this.http
      .post<{
        success: boolean;
        message: string;
        data: Dependencia;
        errors: any;
      }>(`${this.apiUrl}/organizations`, d, this.httpOptions)
      .pipe(map((response) => response.data || []));
  }

  actualizarDependencia(datos: any, id: string): Observable<any> {
    let d = {
      rfc: datos.rfc,
      name: datos.nombre,
      responsible: datos.responsable,
      address: datos.direccion,
      phone: datos.telefono,
      acronym: datos.acronimo,
    };

    return this.http
      .put<{
        success: boolean;
        message: string;
        data: Dependencia[];
        errors: any;
      }>(`${this.apiUrl}/organizations/` + id, d, this.httpOptions)
      .pipe(map((response) => response));
  }

  deleteDependencia(id: number): Observable<any> {
    return this.http
      .delete<{
        success: boolean;
        message: string;
        data: Dependencia[];
        errors: any;
      }>(`${this.apiUrl}/organizations/` + id, this.httpOptions)
      .pipe(map((response) => response));
  }

  // # - - - - - - - - -  AREAS- - - - - - - - - - - - - - - - - - - - - - - - -

  /* 
    getAreas(idDependencia: number): Observable<any> {
        return this.http.get<{ data: Area[] }>('assets/demo/data/areas.json').pipe(map(res => res.data));
        //return this.http.get<{data: any[]}>(`${this.apiUrl}/areas/${idDependencia}`).pipe(map(res => res.data));
    }
     */
  getAreas(): Observable<Area[]> {
    // @Input -> id: number

    let id = 239; // Temporal para probar

    return this.http
      .get<{ success: boolean; message: string; data: Area[]; errors: any }>(
        `${this.apiUrl}/areas/organization/` + id,
        this.httpOptions
      )
      .pipe(map((response) => response.data || []));
  }

  getAreaById(id: number): Observable<Area> {
    return this.http
      .get<{ success: boolean; message: string; data: Area; errors: any }>(
        `${this.apiUrl}/areas/${id}`,
        this.httpOptions
      )
      .pipe(map((response) => response.data || []));
  }

  agregarAreas(datos: any): Observable<Area> {
    let d = {
      name: datos.nombre,
      idOrganization: datos.idOrganizacion,
      phone: datos.telefono,
      responsible: datos.responsible,
    };

    return this.http
      .post<{ success: boolean; message: string; data: Area; errors: any }>(
        `${this.apiUrl}/areas`,
        d,
        this.httpOptions
      )
      .pipe(map((response) => response.data || []));
  }

  actualizarArea(datos: any, id: string): Observable<any> {
    let d = {
      name: datos.nombre,
      idOrganization: datos.idOrganizacion,
      phone: datos.telefono,
      responsible: datos.responsible,
    };

    return this.http
      .put<{ success: boolean; message: string; data: Area[]; errors: any }>(
        `${this.apiUrl}/areas/` + id,
        d,
        this.httpOptions
      )
      .pipe(map((response) => response));
  }

  deleteArea(id: number): Observable<any> {
    return this.http
      .delete<{ success: boolean; message: string; data: Area[]; errors: any }>(
        `${this.apiUrl}/areas/` + id,
        this.httpOptions
      )
      .pipe(map((response) => response));
  }

  // # - - - - - - - - - - CONVENIOS - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  getConvenios(id: string): Observable<Convenio[]> {
    return this.http
      .get<{
        success: boolean;
        message: string;
        data: Convenio[];
        errors: any;
      }>(`${this.apiUrl}/agreements/organization/` + id, this.httpOptions)
      .pipe(map((response) => response.data || []));
  }

  getConvenioById(id: number): Observable<Convenio> {
    return this.http
      .get<{ success: boolean; message: string; data: Convenio; errors: any }>(
        `${this.apiUrl}/agreements/${id}`,
        this.httpOptions
      )
      .pipe(map((response) => response.data || []));
  }

  agregarConvenio(datos: any): Observable<Convenio> {
    let d = {
      idOrganization: datos.rfc,
      agreementDate: datos.nombre,
      status: datos.responsable,
      agreementNumber: datos.direccion,
    };

    return this.http
      .post<{ success: boolean; message: string; data: Convenio; errors: any }>(
        `${this.apiUrl}/agreements`,
        d,
        this.httpOptions
      )
      .pipe(map((response) => response.data || []));
  }

  actualizarConvenio(datos: any, id: string): Observable<any> {
    let d = {
      idOrganization: datos.rfc,
      agreementDate: datos.nombre,
      status: datos.responsable,
      agreementNumber: datos.direccion,
    };

    return this.http
      .put<{
        success: boolean;
        message: string;
        data: Convenio[];
        errors: any;
      }>(`${this.apiUrl}/agreements/` + id, d, this.httpOptions)
      .pipe(map((response) => response));
  }

  deleteConvenio(id: number): Observable<any> {
    return this.http
      .delete<{
        success: boolean;
        message: string;
        data: Convenio[];
        errors: any;
      }>(`${this.apiUrl}/agreements/` + id, this.httpOptions)
      .pipe(map((response) => response));
  }
}
