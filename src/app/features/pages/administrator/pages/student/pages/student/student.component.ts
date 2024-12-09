import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApplicationDTO } from 'src/app/core/interfaces/application.interface';
import { ApplicationsService } from 'src/app/core/services/applications/applications.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})

export class StudentComponent implements OnInit {
  applicationselected: ApplicationDTO = {} as ApplicationDTO;
  public applications: ApplicationDTO[] = [];

  
  //customers!: any[];
  //representatives!: any[];
  statuses!: any[];
  loading: boolean = false;
  //activityValues: number[] = [0, 100];
  //items!: MenuItem[];
  selected: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly _applicationsService: ApplicationsService
  ) {}

  ngOnInit() {
    this.loadFakeData(); // Cargar datos ficticios al inicializar el componente

    //this.loadData();

    /*this.items = [
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
    */
  }

  loadFakeData(): void {
    // Datos ficticios
    this.applications = [
      {
        id: 1,
        userId: 'Juan Perez',
        ubc: 'Licenciatura en Gobierno y Gestión Pública',
        date: 'Aceptado',
        projectId: 101,
        statusId: 1,
        authorizedDate: '2024-08-05',
        authorizedUser: 'Proyecto de Administración Pública en el municipio',
      },
      {
        id: 2,
        userId: 'Maria Garcia',
        ubc: 'Ingeniería en Lengua Inglesa',
        date: 'Aceptado',
        projectId: 102,
        statusId: 2,
        authorizedDate: '2024-08-06',
        authorizedUser: 'Proyecto de Traducción y Comunicación Internacional',
      },
      {
        id: 3,
        userId: 'Pedro Sanchez',
        ubc: 'Licenciatura en Ingeniería en Redes',
        date: 'Aceptado',
        projectId: 103,
        statusId: 3,
        authorizedDate: '2024-08-07',
        authorizedUser: 'Proyecto de Implementación de Redes en la UQROO',
      },
      {
        id: 4,
        userId: 'Luisa Morales',
        ubc: 'Licenciatura en Derecho',
        date: 'Aceptado',
        projectId: 104,
        statusId: 1,
        authorizedDate: '2024-08-08',
        authorizedUser: 'Proyecto de Asesoría Legal en la Defensa Pública',
      }
    ];
    


  }

  /*async loadData(): Promise<void> {
    this.loading = true;
    const applications = await this._applicationsService.getAll();
    console.log(applications);
    this.loading = false;
    
    this.applications = [...applications!];
    //console.log(projects);
  }*/

  async loadData(): Promise<void> {
    this.loading = true;
    try {
      const applications = await this._applicationsService.getAll();
      this.applications = applications || [];
      console.log('Applications loaded:', this.applications);
    } catch (error) {
      console.error('Error loading applications:', error);
      this.applications = [];
    } finally {
      this.loading = false;
    }
  }



  /*
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
*/
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
    
