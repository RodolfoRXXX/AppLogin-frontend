import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from '../../profile/profile.component';
import { LogoutComponent } from '../../logout/logout.component';
import { DashboardProfileComponent } from '../../dashboard-profile/dashboard-profile.component';
import { ConfigurationProfileComponent } from '../../configuration-profile/configuration-profile.component';
import { EditEmailConfigurationProfileComponent } from '../../edit-email-configuration-profile/edit-email-configuration-profile.component';
import { EditPassConfigurationProfileComponent } from '../../edit-pass-configuration-profile/edit-pass-configuration-profile.component';
import { EmailCheckerComponent } from '../../email-checker/email-checker.component';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from '../../menu-lateral/menu-lateral-fijo/menu-lateral.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    DashboardProfileComponent,
    ConfigurationProfileComponent,
    EditEmailConfigurationProfileComponent,
    EditPassConfigurationProfileComponent,
    EmailCheckerComponent,
    MenuLateralComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule
  ]
})
export class SecureModule { }
