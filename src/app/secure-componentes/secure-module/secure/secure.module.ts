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
import { LinkTagComponent } from '../../tag-folder/link-tag/link-tag.component';
import { AlertTagComponent } from '../../tag-folder/alert-tag/alert-tag.component';
import { EditNameConfigurationProfileComponent } from '../../configuration-folder/edit-name-configuration-profile/edit-name-configuration-profile.component';
import { ModalUbicacionComponent } from '../../modals/modal-ubicacion/modal-ubicacion.component';
import { ModalSesionComponent } from '../../modals/modal-sesion/modal-sesion.component';
import { ModalMarcarPosicionComponent } from '../../tag-folder/modals/modal-marcar-posicion/modal-marcar-posicion.component';
import { DataBoxComponent } from '../../tag-folder/vista-tag/componentes/data-box/data-box.component';
import { DataBoxSectionComponent } from '../../tag-folder/vista-tag/componentes/data-box-section/data-box-section.component';
import { FooterComponent } from 'src/app/secure-componentes/footer/footer.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    FooterComponent,
    DashboardProfileComponent,
    ConfigurationProfileComponent,
    EditEmailConfigurationProfileComponent,
    EditPassConfigurationProfileComponent,
    EditNameConfigurationProfileComponent,
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
    ModalSesionComponent,
    VistaTagComponent,
    DataBoxComponent,
    DataBoxSectionComponent,
    DetailTagComponent,
    LinkTagComponent,
    AlertTagComponent,
    ModalUbicacionComponent,
    ModalMarcarPosicionComponent
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
