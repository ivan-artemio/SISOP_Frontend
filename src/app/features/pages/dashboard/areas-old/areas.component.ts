import { Component, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableServiceAreas } from '../../../../shared/services/table-service-areas.service';
import { Area } from '../../../../shared/interface/dependencia';
import { NgbdSortableHeader, SortEvent, SortEventArea } from '../../../../shared/directives/sortable.directive';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  providers: [TableServiceAreas, DecimalPipe],

})
export class AreasComponent {

  //public  tableData$: Observable<supportDB[]>;
  //public  Data: supportDB[];
  public areas: Observable<Area[]>;
  public Datos: Area[];
  public total$: Observable<number>;
  public showEditSpace = false;

  agregarAreaForm: FormGroup = new FormGroup({});
  


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: TableServiceAreas,
    private router: Router,
    private modalService: NgbModal,
    public dialogRef: MatDialogRef<AreasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //Acá recibimos el id de la dependencia para buscar las áreas :ok
  ) {
    
  }

  ngOnInit() {
    this.areas = this.service.areas;
    this.total$ = this.service.total$;
    console.log('Received ID:', this.data.id); 
    // ! RECIBIMOS EL ID DE LA DEPENDENCIA, AHORA HAY QUE TRAER LOS AS ÁREAS DE LAS DEPENDENCIAS

    this.areas.subscribe((res) => {
      this.Datos = res;
    });
  }

  onSort({ column, direction }: SortEventArea) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  removeItem(id: number) {
    /* this.tableData$.subscribe((data: supportDB[]) => {
      data.map((elem: supportDB, i: number) => { elem.id == id && data.splice(i, 1) })
    }) */
    this.areas.subscribe((data: Area[]) => {
      data.map((elem: Area, i: number) => { elem.id == id && data.splice(i, 1) })
    })
  }

  agregarArea() {
    //...
  }

  showFormEdit(){
    this.showEditSpace = true;
  }
 
}
