import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { CarrerasService } from '../../services/carreras.service';

@Component({
  selector: 'app-carreras-lista',
  templateUrl: './carreras-lista.component.html',
  styleUrl: './carreras-lista.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CarreraListaComponent implements OnInit {
  loading: boolean = true;
  carreras: any[] = [];

  private carrerasService = inject(CarrerasService);

  @ViewChild('filter') filter!: ElementRef;

  constructor() {}

  /*products: any[] = [
    { codigo: '123', nombre: 'Producto A', categoria: 'Electrónica', cantidad: 10 },
    { codigo: '456', nombre: 'Producto B', categoria: 'Ropa', cantidad: 5 },
    { codigo: '789', nombre: 'Producto C', categoria: 'Juguetes', cantidad: 20 }
  ];*/

  ngOnInit() {
    this.carrerasService.getCarreras().subscribe({
      next: (carreras) => {
        this.carreras = carreras;
        this.loading = false;
        //console.log("--", this.carreras);
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });

    this.carrerasService.getProjects().subscribe({
      next: (xxx) => {
        console.log('--', xxx);
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });

    // this.carrerasService.login().subscribe({
    //   next: (response) => {
    //     // Maneja la respuesta de la API aquí
    //     console.log('Respuesta de la API:', response);
    //   },
    //   error: (error) => {
    //     // Maneja el error aquí
    //     console.error('Error al iniciar sesión:', error);
    //   }
    // });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    console.log(table);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
