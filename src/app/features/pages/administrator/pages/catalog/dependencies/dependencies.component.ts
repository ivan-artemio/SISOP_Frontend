import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { NewDependencyComponent } from './components/new-dependency/new-dependency.component';
import { OrganizationsService } from 'src/app/core/services/organizations/organizations.service';
import { OrganizationDTO } from 'src/app/core/interfaces/organization.interface';
import { ActionForm } from 'src/app/core/constants/constants.core';

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrl: './dependencies.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DependenciesComponent implements OnInit {
  representatives!: any[];
  statuses!: any[];
  loading: boolean = false;
  readOnly: boolean = false;
  actionFormSelected: ActionForm;
  actionsFormEnum: typeof ActionForm = ActionForm;
  organizationSelected: OrganizationDTO = {} as OrganizationDTO;

  public organizations: OrganizationDTO[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly _modalService: NgbModal,
    private readonly _organizationsService: OrganizationsService
  ) {}

  ngOnInit(): void {
    this.loadData();
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
    const organizations = await this._organizationsService.getAll();
    this.loading = false;
    this.organizations = [...organizations!];
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

  confirmDelete(event: Event, data: OrganizationDTO): void {
    this.confirmationService.confirm({
      target: event.target || new EventTarget(),
      message: 'Estas seguro(a) que deseas eliminar el registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: async () => {
        const result = await this._organizationsService.deleteRemove(data);
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

  actionsForm(action: ActionForm, data: OrganizationDTO | null): void {
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
    this.organizationSelected = data || ({} as OrganizationDTO);
    this.openDependency();
  }

  openDependency(): void {
    const modal = this._modalService.open(NewDependencyComponent, {
      size: 'lg',
    });
    modal.componentInstance.readOnly = this.readOnly;
    modal.componentInstance.data = this.organizationSelected;

    modal.closed.subscribe(async (data: OrganizationDTO) => {
      console.log(data);
      if (data !== null) {
        if (this.actionFormSelected === ActionForm.CREATE) {
          const result = await this._organizationsService.postCreate(data);
        } else {
          data.id = this.organizationSelected.id;
          const result = await this._organizationsService.patchUpdate(data);
        }
        this.loadData();
      }
    });
  }
}
