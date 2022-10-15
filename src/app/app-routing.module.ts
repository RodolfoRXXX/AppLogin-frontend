import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './auth/components/forgot/forgot.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { ConfigurationProfileComponent } from './secure-componentes/configuration-folder/configuration-profile/configuration-profile.component';
import { DashboardProfileComponent } from './secure-componentes/dashboard-folder/dashboard-profile/dashboard-profile.component';
import { EditTagComponent } from './secure-componentes/tag-folder/edit-tag/edit-tag.component';
import { EmailCheckerComponent } from './secure-componentes/email-checker/email-checker.component';
import { LogoutComponent } from './secure-componentes/logout/logout.component';
import { TagsProfileComponent } from './secure-componentes/tag-folder/tags-profile/tags.profile.component';
import { ProfileComponent } from './secure-componentes/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { VerificateGuardGuard } from './services/verificate-guard.guard';
import { AllTagComponent } from './secure-componentes/tag-folder/all-tag/all-tag.component';
import { LinkTagComponent } from './secure-componentes/tag-folder/link-tag/link-tag.component';
import { AlertTagComponent } from './secure-componentes/tag-folder/alert-tag/alert-tag.component';

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
      {path: 'tags', component: TagsProfileComponent,
        children: [
          {path: '', redirectTo: 'all-tag', pathMatch: 'full'},
          {path: 'all-tag', component: AllTagComponent},
          {path: 'edit-tag/:tipo/:id', component: EditTagComponent},
          {path: 'alert-tag/:tipo/:id', component: AlertTagComponent},
          {path: 'link-tag/:tipo/:id', component: LinkTagComponent}
        ]
      },
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
