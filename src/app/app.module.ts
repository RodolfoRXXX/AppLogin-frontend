import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';

import { NavbarComponent } from './nav/navbar/navbar.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { SecureModule } from './secure-componentes/secure-module/secure/secure.module';
import { NotifierComponent } from './nonsecure-componentes/notifier/notifier.component';
import { EmailCheckerComponent } from './secure-componentes/email-checker/email-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotifierComponent,
    EmailCheckerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    SecureModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServiceService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
