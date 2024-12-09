import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SubjectComponent } from './pages/subject/subject.component';
import { ProcessComponent } from './pages/process/process.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProjectComponent } from './pages/project/project.component';

@NgModule({
  declarations: [
    SubjectComponent,
    ProcessComponent,
    NotificationComponent,
    ProjectComponent,
  ],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
