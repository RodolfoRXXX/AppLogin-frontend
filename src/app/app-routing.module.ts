import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './nonsecure-componentes/home/home.component';
import { LogoutComponent } from './secure-componentes/logout/logout.component';
import { ProfileComponent } from './secure-componentes/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
  {path: 'logout', canActivate: [AuthGuardService], component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
