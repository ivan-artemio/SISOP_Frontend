import { Component } from '@angular/core';

@Component({
  selector: 'app-esperando-validacion',
  templateUrl: './esperando-validacion.component.html',
  styleUrl: './esperando-validacion.component.scss'
})
export class EsperandoValidacionComponent {

  recargarPagina() {
    window.location.reload();
  }
  
}
