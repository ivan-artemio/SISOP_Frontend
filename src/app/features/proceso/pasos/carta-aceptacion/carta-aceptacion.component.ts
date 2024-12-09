import { Component } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';


@Component({
  selector: 'app-carta-aceptacion',
  templateUrl: './carta-aceptacion.component.html',
  styleUrl: './carta-aceptacion.component.scss'
})
export class CartaAceptacionComponent {
  public files: File[] = [];

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
  }
  
  constructor() { }
    ngOnInit(): void {
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
