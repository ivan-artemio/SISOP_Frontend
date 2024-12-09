import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Dependencia } from '../../../../shared/interface/dependencia';
import { NgbdSortableHeader, SortEvent } from '../../../../shared/directives/sortable.directive';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AreasComponent } from '../areas/areas.component';
import { AgregarDependenciaComponent } from '../agregar-dependencia/agregar-dependencia.component';
import { GlobalDependenciaService } from 'src/app/shared/services/global-dependencia.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dependencias',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.scss'],
  providers: [DecimalPipe, MessageService],

  encapsulation: ViewEncapsulation.ShadowDom,
})

export class DependenciasComponent {

  
  showModalArea: boolean = false;
  
  loading: boolean = true;
  dependencias: Dependencia[] = [];
  dependencia: any = {};
  idDependencia: number = 0;

  productDialog: boolean = false;

  deleteDependenciaDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  private globalService = inject(GlobalDependenciaService);

  @ViewChild('filter') filter!: ElementRef;
  @Output() onHideDialog: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService, 
  ) { }

  ngOnInit() {

    this.onHideDialog.subscribe((event) => {
      this.onAfterHide();
    });

    this.globalService.getDependencias().subscribe({
      next: (dependencias) => {

        this.dependencias = dependencias;
        this.loading = false;
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete') 
    })


  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    console.log(table);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  deleteDependencia(dependencia: Dependencia) { //product: Product  
    this.idDependencia = dependencia.id;
    this.deleteDependenciaDialog = true;
    this.dependencia = { ...dependencia };
  }

  confirmDelete() {

    this.globalService.deleteDependencia(this.idDependencia).subscribe({
      next: (response) => {
        if(response.success){
          this.dependencias = this.dependencias.filter(val => val.id !== this.dependencia.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dependenca eliminada', life: 3000 });
          this.dependencia = {};
        }else{
          this.messageService.add({ severity: 'error', summary: 'No se pudo eliminar', detail: 'Intente más tarde', life: 3000 });
        } 
        this.deleteDependenciaDialog = false;
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete') 
    })

  }

  agregarDependencia() {
    this.router.navigate(['/dashboard/agregar-dependencia']);
  }

  editarDependencia(id: number) {
    //console.log('editando')
    this.router.navigate(['/dashboard/agregar-dependencia'], { queryParams: { id: id } });
  } 


  /* showAreas(id: number): void {
    const dialogRef = this.dialog.open(AreasComponent, {
      width: '750px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  } */
  showArea(){
    this.showModalArea = true
  }

  showConvenios(id: number): void {

  }

  //Agregado por problema de compatibilidad de los dilogos Primeng con la plantilla Riho 
  onAfterHide() {
    document.body.classList.remove('p-overflow-hidden');
    document.body.style.removeProperty('--scrollbar-width');
  }

}