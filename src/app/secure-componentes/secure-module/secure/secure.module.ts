import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from '../../profile/profile.component';
import { LogoutComponent } from '../../logout/logout.component';
import { DashboardProfileComponent } from '../../dashboard-folder/dashboard-profile/dashboard-profile.component';
import { ConfigurationProfileComponent } from '../../configuration-folder/configuration-profile/configuration-profile.component';
import { EditEmailConfigurationProfileComponent } from '../../configuration-folder/edit-email-configuration-profile/edit-email-configuration-profile.component';
import { EditPassConfigurationProfileComponent } from '../../configuration-folder/edit-pass-configuration-profile/edit-pass-configuration-profile.component';
import { EmailCheckerComponent } from '../../email-checker/email-checker.component';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from '../../menu-lateral/menu-lateral-fijo/menu-lateral.component';
import { TagsProfileComponent } from '../../tag-folder/tags-profile/tags.profile.component';
import { EditTagComponent } from '../../tag-folder/edit-tag/edit-tag.component';
import { AllTagComponent } from '../../tag-folder/all-tag/all-tag.component';
import { PersonaFormComponent } from '../../tag-folder/edit-tag/forms/persona-form/persona-form.component';
import { MascotaFormComponent } from '../../tag-folder/edit-tag/forms/mascota-form/mascota-form.component';
import { VehiculoFormComponent } from '../../tag-folder/edit-tag/forms/vehiculo-form/vehiculo-form.component';
import { ModalRedesComponent } from '../../tag-folder/modals/modal-redes/modal-redes.component';
import { ModalConfirmacionComponent } from '../../tag-folder/modals/modal-confirmacion/modal-confirmacion.component';
import { VistaTagComponent } from '../../tag-folder/vista-tag/vista-tag.component';
import { DetailTagComponent } from '../../tag-folder/vista-tag/componentes/detail-tag/detail-tag.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    DashboardProfileComponent,
    ConfigurationProfileComponent,
    EditEmailConfigurationProfileComponent,
    EditPassConfigurationProfileComponent,
    EmailCheckerComponent,
    MenuLateralComponent,
    TagsProfileComponent,
    EditTagComponent,
    AllTagComponent,
    PersonaFormComponent,
    MascotaFormComponent,
    VehiculoFormComponent,
    ModalRedesComponent,
    ModalConfirmacionComponent,
    VistaTagComponent,
    DetailTagComponent
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
