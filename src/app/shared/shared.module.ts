import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideDirective } from './directives/outside.directive';
import { FeathericonComponent } from './components/feathericon/feathericon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';

@NgModule({
  declarations: [
    FeathericonComponent,
    TapToTopComponent,
    LoaderComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    FeathericonComponent,
    TapToTopComponent,
    LoaderComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
