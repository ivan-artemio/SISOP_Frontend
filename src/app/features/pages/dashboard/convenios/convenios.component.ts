import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Convenio } from '../../../../shared/interface/dependencia';
import { NgbdSortableHeader, SortEventConvenio } from '../../../../shared/directives/sortable.directive';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss'],
  providers: [DecimalPipe],

})
export class ConveniosComponent {

  //public  tableData$: Observable<supportDB[]>;
  //public  Data: supportDB[];
  public convenios: Observable<Convenio[]>;
  public Datos: Convenio[];
  public total$: Observable<number>;
  public showEditSpace = false;

  agregarConvenioForm: FormGroup = new FormGroup({});
  


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    /* this.tableData$.subscribe((res) => {
      this.Data = res;
    }); */
    this.convenios.subscribe((res) => {
      this.Datos = res;
    });
  }

  onSort({ column, direction }: SortEventConvenio) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

  }

  removeItem(id: number) {
    /* this.tableData$.subscribe((data: supportDB[]) => {
      data.map((elem: supportDB, i: number) => { elem.id == id && data.splice(i, 1) })
    }) */
    this.convenios.subscribe((data: Convenio[]) => {
      data.map((elem: Convenio, i: number) => { elem.id == id && data.splice(i, 1) })
    })
  }

  agregarConvenio() {
    //...
  }

  showFormEdit(){
    this.showEditSpace = true;
  }
 
}
