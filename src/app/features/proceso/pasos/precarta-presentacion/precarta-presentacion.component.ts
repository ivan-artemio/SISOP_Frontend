import { Component } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-precarta-presentacion',
  templateUrl: './precarta-presentacion.component.html',
  styleUrl: './precarta-presentacion.component.scss'
})
export class PrecartaPresentacionComponent {
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
