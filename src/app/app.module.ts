import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';

import { NavbarComponent } from './nav/navbar/navbar.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { SecureModule } from './secure-componentes/secure-module/secure/secure.module';
import { NotifierComponent } from './nonsecure-componentes/notifier/notifier.component';
import { NgbdOffcanvasBasic } from './nav/menu-lateral-offcanvas/menu-lateral-offcanvas.component';
import { ModalSesionComponent } from './modals/modal-sesion/modal-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotifierComponent,
    NgbdOffcanvasBasic,
    ModalSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    SecureModule,
    NgbModule
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
