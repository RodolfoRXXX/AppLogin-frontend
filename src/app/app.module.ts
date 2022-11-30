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
import { PageNotFoundComponent } from './nonsecure-componentes/page-not-found/page-not-found.component';
import { LostTagComponent } from './nonsecure-componentes/lost-tag/lost-tag.component';
import { CardAlertComponent } from './nonsecure-componentes/lost-tag/components/card-alert/card-alert.component';
import { NgbdOffcanvasBasic } from './nav/menu-lateral-offcanvas/menu-lateral-offcanvas.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotifierComponent,
    PageNotFoundComponent,
    LostTagComponent,
    CardAlertComponent,
    NgbdOffcanvasBasic
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    SecureModule,
    NgbModule,
    SwiperModule
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
