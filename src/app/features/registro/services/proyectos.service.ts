import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<any> {
    return this.http.get<any[]>('https://api.escuelajs.co/api/v1/products');
  }

  getProjects(): Observable<any> {
    // Construye la URL para obtener proyectos
    const url = `https://apis-system.uqroo.mx:8443/SESO/api/v1.0/projects`;

    const token = this.getToken();

    // Configura los encabezados de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Utiliza el token de autenticación proporcionado
    });
    
    // Realiza la solicitud GET y devuelve un Observable con la respuesta
    return this.http.get<any[]>(url, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem("tokenAccess");
  }

  //Acceder local storage 
  // getAllData() {
  //   const allData: { key: string, value: any }[] = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     if (key !== null) {
  //       const value = localStorage.getItem(key);
  //       const data = { key, value };
  //       allData.push(data);
  //     }
  //   }
  //   console.log(allData);
  // }

}
