import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { ProjectDTO } from 'src/app/core/interfaces/project.interface';

import { AreasService } from 'src/app/core/services/areas/areas.service';
import { AreaDTO } from 'src/app/core/interfaces/area.interface';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.scss'
})
export class CreateNotificationComponent implements OnInit { 
  @Input() readOnly: boolean = false;
  @Input() data: ProjectDTO | undefined = undefined;
  @Input() areas: AreaDTO[] = [];
  tipos: any[];
  ciudades: any[];
  estatus: any[];
  areasOptions: any[];
  //public projects: ProjectDTO[] = [];

  projectForm = new FormGroup({    
    name: new FormControl<string | null>(null, [Validators.required]),
    areaId: new FormControl<number | null>(null, [Validators.required]),
    responsible: new FormControl<string | null>(null, [Validators.required]),
    cityId: new FormControl<string | null>(null, [Validators.required]),
    typeId: new FormControl(<string | null>null, [Validators.required]),
    quota: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    private readonly _activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    // Inicializa areasOptions primero
    this.areasOptions = this.areas.map((area) => ({
      label: area.name,
      value: area.id,
    }));

  
    if (this.data !== undefined) {
      //console.log(this.data.areaId);
      this.data.areaId = +this.data.areaId; // Convertir areaId a número
      this.projectForm.patchValue(this.data);
    }

    if (this.readOnly) {
      this.projectForm.disable();
    }


    this.tipos = [
      { label: 'Todos', value: '1' },
      { label: 'Iván Artemio Aguirre Salazar', value: '2' },
    ];

    this.ciudades = [
      { label: 'COZUMEL', value: '218' },
    ];

    this.estatus = [
      { label: 'Activo', value: 'ACT' },
    ];

  }

  closeModal(): void {
    this._activeModal.close(null);
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      console.log("--------------");
      this.projectForm.markAsTouched();
      return;
    }
    this._activeModal.close(this.projectForm.value);
  }

}
