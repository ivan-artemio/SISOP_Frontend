import {
  Component,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
//import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { CarrerasService } from '../../services/carreras.service';

@Component({
  selector: 'app-archivos-lista',
  //standalone: true,
  //imports: [],
  templateUrl: './archivos-lista.component.html',
  styleUrl: './archivos-lista.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ArchivosListaComponent {
  idCarrera?: string;
  loading: boolean = true;
  archivos: any[] = [];
  selectedArchivos: any[] = [];
  archivo: any = {};
  @Output() onHideDialog: EventEmitter<any> = new EventEmitter();

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  //   products: Product[] = [];

  //   product: Product = {};

  //   selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private carrerasService: CarrerasService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onHideDialog.subscribe((event) => {
      this.onAfterHide();
    });

    this.activatedRoute.params.subscribe((params) => {
      console.log((this.idCarrera = params['idCarrera']));
    });
    this.carrerasService.getCarreras().subscribe({
      next: (archivos) => {
        this.archivos = archivos;
        this.loading = false;
        //console.log("--", this.archivos);
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });

    //this.productService.getProducts().then(data => this.products = data);

    /*this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];*/
  }

  openNew() {
    this.archivo = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(archivo: any) {
    //product: Product
    this.archivo = { ...archivo };
    this.productDialog = true;
  }

  deleteProduct(archivo: any) {
    //product: Product
    this.deleteProductDialog = true;
    this.archivo = { ...archivo };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.archivos = this.archivos.filter(
      (val) => !this.selectedArchivos.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedArchivos = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.archivos = this.archivos.filter((val) => val.id !== this.archivo.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
    this.archivo = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.archivo.name?.trim()) {
      if (this.archivo.id) {
        // @ts-ignore
        this.archivo.inventoryStatus = this.archivo.inventoryStatus.value
          ? this.archivo.inventoryStatus.value
          : this.archivo.inventoryStatus;
        this.archivos[this.findIndexById(this.archivo.id)] = this.archivo;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'archivo Updated',
          life: 3000,
        });
      } else {
        this.archivo.id = this.createId();
        this.archivo.code = this.createId();
        this.archivo.image = 'product-placeholder.svg';
        // @ts-ignore
        this.archivo.inventoryStatus = this.archivo.inventoryStatus
          ? this.archivo.inventoryStatus.value
          : 'INSTOCK';
        this.archivos.push(this.archivo);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'archivo Created',
          life: 3000,
        });
      }

      this.archivos = [...this.archivos];
      this.productDialog = false;
      this.archivo = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.archivos.length; i++) {
      if (this.archivos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  //Agregado por problema de compatibilidad de los dilogos Primeng con la plantilla Riho
  onAfterHide() {
    console.log('foiefoerfncds');
    document.body.classList.remove('p-overflow-hidden');
    document.body.style.removeProperty('--scrollbar-width');
  }
}
