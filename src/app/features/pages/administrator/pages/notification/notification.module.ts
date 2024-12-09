import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateNotificationComponent } from './notifications/components/create-notification/create-notification.component';

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
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NotificationsComponent,
    CreateNotificationComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
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
export class NotificationModule {}
