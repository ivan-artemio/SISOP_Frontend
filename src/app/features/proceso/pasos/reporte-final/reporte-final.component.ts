import { Component } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';


@Component({
  selector: 'app-reporte-final',
  templateUrl: './reporte-final.component.html',
  styleUrl: './reporte-final.component.scss'
})
export class ReporteFinalComponent {
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
