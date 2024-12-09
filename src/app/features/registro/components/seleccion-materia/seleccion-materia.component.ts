import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seleccion-materia',
  templateUrl: './seleccion-materia.component.html',
  styleUrl: './seleccion-materia.component.scss'
})
export class SeleccionMateriaComponent {
  selectedMateria: string = '';

  constructor(private router: Router) {}

  onValidate() {
    if (this.selectedMateria) {
      this.router.navigate(['/registro/proyectos-lista'], { queryParams: { materia: this.selectedMateria } });
    } else {
      alert('Por favor, seleccione una materia.');
    }
  }
}
