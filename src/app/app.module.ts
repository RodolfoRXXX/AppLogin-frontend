import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';

import { NavbarComponent } from './nav/navbar/navbar.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { ProfileComponent } from './secure-componentes/profile/profile.component';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { LogoutComponent } from './secure-componentes/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule
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
