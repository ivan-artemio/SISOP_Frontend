import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

export const data: any = [
  {
    id: 1,
    name: 'Cesar Euan',
    country: {
      name: 'México',
      code: 'dz',
    },
    company: 'Ingeniería en redes',
    date: '2015-09-13',
    status: 'cancelado',
    verified: true,
    activity: 17,
    representative: {
      name: 'Aproyo gubernamental',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
  {
    id: 2,
    name: 'Arturo Cardenas',
    country: {
      name: 'Estados unidos',
      code: 'dz',
    },
    company: 'Licenciatura en Derecho',
    date: '2015-09-13',
    status: 'terminado',
    verified: true,
    activity: 17,
    representative: {
      name: 'Software',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
  {
    id: 3,
    name: 'Cristy Escamilla',
    country: {
      name: 'Brasil',
      code: 'dz',
    },
    company: 'Licenciatura en Derecho',
    date: '2015-09-13',
    status: 'proceso',
    verified: true,
    activity: 17,
    representative: {
      name: 'Declaraciones',
      image: 'ionibowcher.png',
    },
    balance: 70663,
  },
];

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent implements OnInit {
  customers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  items!: MenuItem[];
  selected: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'View',
        icon: 'pi pi-fw pi-search',
        command: () => this.viewProduct(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteProduct(),
      },
    ];

    this.customers = data;
    this.customers.forEach(
      (customer) => (customer.date = new Date(<Date>customer.date))
    );

    this.representatives = [
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    ];

    this.statuses = [
      { label: 'Cancelado', value: 'cancelado' },
      { label: 'Terminadi', value: 'terminado' },
      { label: 'En Proceso', value: 'proceso' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string): string | null {
    switch (status) {
      case 'cancelado':
        return 'danger';
      case 'terminado':
        return 'success';
      case 'new':
        return 'info';
      case 'negotiation':
        return 'warning';
      case 'proceso':
        return 'renewal';
      default:
        return null;
    }
  }

  viewProduct() {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: '',
    });
  }

  deleteProduct() {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Deleted',
      detail: '',
    });
  }

  confirmDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.target || new EventTarget(),
      message: 'Estas seguro(a) que deseas eliminar el registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Registro eliminado',
          life: 5000,
        });
      },
      reject: () => {},
    });
  }
}
