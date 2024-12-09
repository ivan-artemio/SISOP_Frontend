import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { ApplicationDTO } from 'src/app/core/interfaces/application.interface';
import { ApplicationsService } from 'src/app/core/services/applications/applications.service';
import { ActivatedRoute } from '@angular/router';


export enum Actions {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.component.html',
  styleUrl: './info-student.component.scss',
})
export class InfoStudentComponent implements OnInit {
  //idApplication: string | null = null;
  application: ApplicationDTO | null = null; // Propiedad para almacenar los datos de la solicitud
  public Actions = Actions;
  loading: boolean = false;
  sectionsEnabled: boolean = false; // Nueva propiedad para controlar la visibilidad de las secciones
  //cities: City[] | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private readonly _applicationsService: ApplicationsService
  ) {}

  ngOnInit(): void {
    
    // Obtén el parámetro 'id' de la URL
    //this.idApplication = this.route.snapshot.paramMap.get('idApplication');
    this.route.paramMap.subscribe(params => {
      const idApplication = params.get('idApplication');
      if (idApplication !== null) {
        const idAsNumber = parseInt(idApplication, 10);
        if (!isNaN(idAsNumber)) {
          this.loadDataApplication(idAsNumber);
        } else {
          console.error('ID de aplicación no válido');
          // Manejar el caso de ID no válido (por ejemplo, redirigir o mostrar un mensaje de error)
        }
      }
    });

    // Si deseas escuchar los cambios del parámetro, usa `subscribe`
    /*this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });*/

  }

  async loadDataApplication(id: number): Promise<void> {
    this.loading = true;
    try {
      const application = await this._applicationsService.getById(id);
      this.application = application;
      console.log('Application loaded:', this.application);
    } catch (error) {
      console.error('Error loading application:', error);
      this.application = null;
    } finally {
      this.loading = false;
    }
  }

  
  confirmStatus(event: Event, action: Actions): void {
    // Verifica si la acción es ACCEPTED
    if (action === Actions.ACCEPTED) {
      // Llama directamente a updateApplicationStatus
      if (this.application && this.application.id) {
        this.updateApplicationStatus(this.application.id, action);
      }
    } else {
      // Si la acción no es ACCEPTED, muestra la confirmación
      this.confirmationService.confirm({
        target: event.target as HTMLElement, // Pasa el target del evento
        message: '¿Estás seguro(a) que deseas cambiar el estatus?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          if (this.application && this.application.id) {
            this.updateApplicationStatus(this.application.id, action);
          }
        },
        reject: () => {},
      });
    }
  }

  async updateApplicationStatus(id: number, status: Actions): Promise<void> {
    const effectiveDate = new Date().toISOString(); // Genera la fecha actual en formato ISO
    //console.log(effectiveDate);

    try {
        await this._applicationsService.updateStatus(id, status, effectiveDate);
        this.messageService.add({
            severity: 'success',
            summary: 'Confirmación',
            detail: `Registro ${status === Actions.ACCEPTED ? 'aceptado' : 'rechazado'}`,
            life: 5000,
        });
        this.sectionsEnabled = true; // Habilita las secciones después de la petición
    } catch (error) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al cambiar el estatus',
            life: 5000,
        });
    }
}
  
}
