import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ColorPickerComponent } from './customizer/color-picker/color-picker.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { QuickOptionComponent } from './customizer/quick-option/quick-option.component';
import { FooterComponent } from './footer/footer.component';
import { BookmarkComponent } from './header/bookmark/bookmark.component';
import { LanguageComponent } from './header/language/language.component';
import { AllUserComponent } from './header/notification/all-user/all-user.component';
import { MessagesComponent } from './header/notification/messages/messages.component';
import { NotificationCartComponent } from './header/notification/notification-cart/notification-cart.component';
import { NotificationComponent } from './header/notification/notification.component';
import { ProfileComponent } from './header/profile/profile.component';
import { SearchComponent } from './header/search/search.component';
import { ThemeComponent } from './header/theme/theme.component';
import { ContentComponent } from './layout/content/content.component';
import { FullComponent } from './layout/full/full.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    FullComponent,
    FooterComponent,
    SvgIconComponent,
    SearchComponent,
    NotificationComponent,
    ProfileComponent,
    ThemeComponent,
    AllUserComponent,
    BreadcrumbComponent,
    NotificationCartComponent,
    MessagesComponent,
    BookmarkComponent,
    QuickOptionComponent,
    ColorPickerComponent,
    CustomizerComponent,
    LanguageComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    TranslateModule.forRoot(),
    SharedModule,
  ],
  exports: [ContentComponent, SvgIconComponent],
})
export class MainModule {}
