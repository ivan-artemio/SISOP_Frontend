import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Area } from '../../../../shared/interface/dependencia';
import { NgbdSortableHeader, SortEvent } from '../../../../shared/directives/sortable.directive';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarDependenciaComponent } from '../agregar-dependencia/agregar-dependencia.component';
import { GlobalDependenciaService } from 'src/app/shared/services/global-dependencia.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  providers: [DecimalPipe, MessageService],

  encapsulation: ViewEncapsulation.ShadowDom,
})

export class AreasComponent {
  
  @Input({ required: true }) idOrganizacion!: number;
  
  areas: Area[] = [];
  area: any = {};
  idarea: number = 0;
  loading: boolean = true;
  deleteAreaDialog: boolean = false;
  showEditSpace: boolean = false;
  editable: boolean = false;
  
  nombreFormControl: FormControl;
  responsableFormControl: FormControl;
  telefonoFormControl: FormControl;
  agregarAreaForm: FormGroup = new FormGroup({});

  deleteProductsDialog: boolean = false;

  private globalService = inject(GlobalDependenciaService);

  @ViewChild('filter') filter!: ElementRef;
  @Output() onHideDialog: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService, 
  ) {
    this.nombreFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.responsableFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.telefonoFormControl = new FormControl('', [
      Validators.required,
    ]);
  }


  ngOnInit() {

    this.onHideDialog.subscribe((event) => {
      this.onAfterHide();
    });

    this.globalService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
        this.loading = false;
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete') 
    })

    this.agregarAreaForm = this.formBuilder.group({
      nombre: this.nombreFormControl,
      responsable: this.responsableFormControl,
      telefono: this.telefonoFormControl,
    });

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    console.log(table);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  deleteArea(area: Area) { //product: Product  
    this.idarea = area.id;
    this.deleteAreaDialog = true;
    this.area = { ...area };
  }

  confirmDelete() {

    this.globalService.deleteArea(this.idarea).subscribe({
      next: (response) => {
        if(response.success){
          this.areas = this.areas.filter(val => val.id !== this.area.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Área eliminada', life: 3000 });
          this.area = {};
        }else{
          this.messageService.add({ severity: 'error', summary: 'No se pudo eliminar', detail: 'Intente más tarde', life: 3000 });
        } 
        this.deleteAreaDialog = false;
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete') 
    })

  }

  agregarArea() {
    this.showEditSpace = true;
    this.editable = false;
  }
  
  editarArea(id: number) {
    this.showEditSpace = true;
    this.editable = true;
    //mostrar sección para actualizar
  } 
  
  actualizarArea() {
    this.showEditSpace=false
    //mostrar sección para actualizar
  } 
  

  //Agregado por problema de compatibilidad de los dilogos Primeng con la plantilla Riho 
  onAfterHide() {
    document.body.classList.remove('p-overflow-hidden');
    document.body.style.removeProperty('--scrollbar-width');
  }

}