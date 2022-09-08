import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from '../../profile/profile.component';
import { LogoutComponent } from '../../logout/logout.component';
import { DashboardProfileComponent } from '../../dashboard-profile/dashboard-profile.component';
import { ConfigurationProfileComponent } from '../../configuration-profile/configuration-profile.component';
import { EditEmailConfigurationProfileComponent } from '../../edit-email-configuration-profile/edit-email-configuration-profile.component';
import { EditPassConfigurationProfileComponent } from '../../edit-pass-configuration-profile/edit-pass-configuration-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    DashboardProfileComponent,
    ConfigurationProfileComponent,
    EditEmailConfigurationProfileComponent,
    EditPassConfigurationProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SecureModule { }
