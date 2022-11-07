import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ForgotComponent } from '../components/forgot/forgot.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotEnviarComponent } from '../components/forgot/components/forgot-enviar/forgot-enviar.component';
import { ForgotVerificarComponent } from '../components/forgot/components/forgot-verificar/forgot-verificar.component';
import { ForgotActualizarComponent } from '../components/forgot/components/forgot-actualizar/forgot-actualizar.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ForgotEnviarComponent,
    ForgotVerificarComponent,
    ForgotActualizarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
