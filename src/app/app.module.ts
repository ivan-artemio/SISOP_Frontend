import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DecimalPipe } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './features/auth/login/login.component';
import { MainModule } from './features/main/main.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MsAuthComponent } from './features/auth/ms-auth/ms-auth.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, MsAuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    MainModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [
    DecimalPipe,
    MessageService,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
