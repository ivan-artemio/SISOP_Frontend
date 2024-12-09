import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private http = inject(HttpClient);
  
  constructor() { }

  getCarreras(){
    return this.http.get<any[]>('https://api.escuelajs.co/api/v1/products');
  }

  



  getCarreras2() {
    const headers = new HttpHeaders({
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrdXNhbGF6YXIuam9zZUBnbWFpbC5jb20iLCJpYXQiOjE3MTMzNzIxODcsImV4cCI6MTcxMzQ1ODU4N30.5CGVK3pzYzjITuItnOI_fZ2vk01Q28ijae8njEdYURA'
    });
  
    const options = { headers };
    console.log("ddddd");
    return this.http.get<any[]>('http://sisop-back-dev.uqroo.mx:8080/SESO/api/v1.0/projects', options);
  }


  getProjects(): Observable<any> {
    // Construye la URL para obtener proyectos
    const url = `http://sisop-back-dev.uqroo.mx:8080/SESO/api/v1.0/projects`;

    // Configura los encabezados de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrdXNhbGF6YXIuam9zZUBnbWFpbC5jb20iLCJpYXQiOjE3MTMzNzIxODcsImV4cCI6MTcxMzQ1ODU4N30.5CGVK3pzYzjITuItnOI_fZ2vk01Q28ijae8njEdYURA` // Utiliza el token de autenticación proporcionado
    });

    // Realiza la solicitud GET y devuelve un Observable con la respuesta
    return this.http.get<any[]>(url, { headers });
  }

  login() {
    let email: string = "kusalazar.jose@gmail.com";
    let password: string = "berlin88$";

    return this.http.post('http://sisop-back-dev.uqroo.mx:8080/SESO/users/login', { email, password })
      .pipe(
        tap(response => console.log('Respuesta del servidor:', response)),
        catchError(error => {
          console.error('Error al realizar la solicitud:', error);
          throw error; // Relanza el error para que sea manejado por el observador que suscriba al observable
        })
      );
}

  
}
