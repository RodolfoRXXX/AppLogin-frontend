import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './auth/components/forgot/forgot.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { ConfigurationProfileComponent } from './secure-componentes/configuration-profile/configuration-profile.component';
import { DashboardProfileComponent } from './secure-componentes/dashboard-profile/dashboard-profile.component';
import { EmailCheckerComponent } from './secure-componentes/email-checker/email-checker.component';
import { LogoutComponent } from './secure-componentes/logout/logout.component';
import { ProfileComponent } from './secure-componentes/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { VerificateGuardGuard } from './services/verificate-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'verificate', component: EmailCheckerComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardProfileComponent},
      {path: 'configuration', component: ConfigurationProfileComponent}
    ],
    canActivate: [AuthGuardService, VerificateGuardGuard],
  },
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
