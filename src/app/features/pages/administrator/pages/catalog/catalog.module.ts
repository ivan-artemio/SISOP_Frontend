import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProgramsComponent } from './programs/programs.component';
import { PeriodsComponent } from './periods/periods.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { CarrerasModule } from 'src/app/features/carreras/carreras.module';
import { NewDependencyComponent } from './dependencies/components/new-dependency/new-dependency.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateUpdateProjectComponent } from './projects/components/create-update-project/create-update-project.component';
import { AreasComponent } from './dependencies/components/areas/areas.component';

@NgModule({
  declarations: [
    DependenciesComponent,
    ProjectsComponent,
    ProgramsComponent,
    PeriodsComponent,
    NewDependencyComponent,
    CreateUpdateProjectComponent,
    AreasComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    TableModule,
    TagModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    ContextMenuModule,
    ButtonModule,
    TooltipModule,
    ConfirmPopupModule,
    CarrerasModule,
    NgSelectModule,
  ],
  providers: [ConfirmationService],
})
export class CatalogModule {}
