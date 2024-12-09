import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreateUpdateProjectComponent } from './components/create-update-project/create-update-project.component';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { AreasService } from 'src/app/core/services/areas/areas.service';
import { ProjectDTO } from 'src/app/core/interfaces/project.interface';
import { AreaDTO } from 'src/app/core/interfaces/area.interface';
import { ActionForm } from 'src/app/core/constants/constants.core';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})

export class ProjectsComponent implements OnInit {
  representatives!: any[];
  statuses!: any[];
  loading: boolean = false;
  readOnly: boolean = false;
  actionFormSelected: ActionForm; //variable para asignar un valor específico del enum (ActionForm)
  actionsFormEnum: typeof ActionForm = ActionForm; //Acceso a los valores del enum ActionForm.
  projectselected: ProjectDTO = {} as ProjectDTO; //unico objeto
  public projects: ProjectDTO[] = []; //array de multiples objetos
  public areas: AreaDTO[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly _modalService: NgbModal,
    private readonly _projectsService: ProjectsService,
    private readonly _areasService: AreasService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadAreas();
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

  async loadData(): Promise<void> {
    this.loading = true;
    const projects = await this._projectsService.getAll();
    this.loading = false;
    
    this.projects = [...projects!];
    //console.log(projects);
  }

  async loadAreas(): Promise<void> {
    try {
      const areas = await this._areasService.getAll();
      //console.log(areas);
      this.areas = areas ?? []; // Asignar un array vacío si áreas es null
    } catch (error) {
      console.error('Error al cargar las áreas', error);
      this.areas = []; // Asignar un array vacío en caso de error
    }
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

  confirmDelete(event: Event, data: ProjectDTO): void {
    this.confirmationService.confirm({
      target: event.target || new EventTarget(),
      message: 'Estas seguro(a) que deseas eliminar el registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: async () => {
        const result = await this._projectsService.deleteRemove(data);
        this.loadData();
        console.log(result);
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

  actionsForm(action: ActionForm, data: ProjectDTO | null): void {
    switch (action) {
      case ActionForm.CREATE:
        this.readOnly = false;
        this.actionFormSelected = action;
        break;
      case ActionForm.EDIT:
        this.readOnly = false;
        this.actionFormSelected = action;
        break;
      case ActionForm.SHOW:
        this.readOnly = true;
        this.actionFormSelected = action;
        break;
      case ActionForm.DELETE:
        this.readOnly = true;
        this.actionFormSelected = action;
        break;
    }
    this.projectselected = data || ({} as ProjectDTO);
    this.openProject();
  }

  openProject(): void {
    const modal = this._modalService.open(CreateUpdateProjectComponent, {
      size: 'lg',
    });
    modal.componentInstance.readOnly = this.readOnly;
    modal.componentInstance.data = this.projectselected;
    modal.componentInstance.areas = this.areas;

    modal.closed.subscribe(async (data: ProjectDTO) => {
      //console.log(data);
      if (data !== null) {
        if (this.actionFormSelected === ActionForm.CREATE) {
          await this._projectsService.postCreate(data);
        } else {
          data.id = this.projectselected.id;
          await this._projectsService.putUpdate(data);
        }
        this.loadData();
      }
    });
  }
}
