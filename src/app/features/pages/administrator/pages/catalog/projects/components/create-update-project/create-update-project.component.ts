import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { ProjectDTO } from 'src/app/core/interfaces/project.interface';

import { AreasService } from 'src/app/core/services/areas/areas.service';
import { AreaDTO } from 'src/app/core/interfaces/area.interface';

@Component({
  selector: 'app-create-update-project',
  templateUrl: './create-update-project.component.html',
  styleUrl: './create-update-project.component.scss',
})
export class CreateUpdateProjectComponent implements OnInit { 
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
      { label: 'Tipo 1', value: '01' },
      { label: 'Tipo 2', value: '2' },
      { label: 'Tipo 3', value: '3' }
    ];

    this.ciudades = [
      { label: 'COZUMEL', value: '218' },
    ];

    this.estatus = [
      { label: 'Activo', value: 'ACT' },
    ];

  }

  // async loadAreas(): Promise<void> {
  //   try {
  //     const projects = await this._areasService.getAll();
  //     console.log(projects);
  //     if (projects !== null && projects !== undefined) {
  //       this.areas = projects.map((project) => {
  //         return {
  //           label: project.name,
  //           value: project.id,
  //         };
  //       });
  //     } else {
  //       console.error('La lista de proyectos está vacía o indefinida.');
  //     }
  //   } catch (error) {
  //     console.error('Error al cargar los projects', error);
  //     // Puedes manejar el error aquí (mostrar mensaje al usuario, etc.)
  //   }
  // }


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
