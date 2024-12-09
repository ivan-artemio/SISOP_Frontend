import { Component } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-carta-culminacion',
  templateUrl: './carta-culminacion.component.html',
  styleUrl: './carta-culminacion.component.scss'
})
export class CartaCulminacionComponent {
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
