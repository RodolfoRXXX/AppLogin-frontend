import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { emailValidator, validarEmail } from '../../function/functions';
import { md5 } from 'src/app/secure-componentes/function/md5';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-edit-email-configuration-profile',
  templateUrl: './edit-email-configuration-profile.component.html',
  styleUrls: ['./edit-email-configuration-profile.component.css']
})
export class EditEmailConfigurationProfileComponent implements OnInit {

  form: FormGroup;
  estadoSmt: string;

  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _com: ComunicationService,
    private _router: Router,
    private _email: EmailService
  ) {
    this.estadoSmt = 'actualizar';
  }

  ngOnInit(): void {
    let data = this._auth.getUserDetails();
    if(data){
      this.crearFormulario(JSON.parse(data)[0].id);
    } else{
      this._router.navigate(['login']);
    }
  }

  crearFormulario( id:string ){
    this.form = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          emailValidator()
        ]),
      reemail: new FormControl('',
        [
          Validators.required
        ]),
      id: new FormControl((id)?id:'',
        [
          Validators.required
        ]),
      codeEmail: new FormControl(''),
      active: new FormControl(0)
    }, { validators: validarEmail })
  }

  actualizarSmt(){
    if((this.estadoSmt == 'error')||(this.estadoSmt == 'ok')){
      this.estadoSmt = 'actualizar';
    }
  }

  onSubmit(){
    this.estadoSmt = 'load';
    let codigo_hash = md5(this.form.get('email')?.value).slice(0,6);
    this.form.controls['codeEmail'].setValue(codigo_hash);
    this._api.putTypeRequest('profile/update-email', this.form.value).subscribe( (res:any) => {
      if((res.status != 0)&&(res.data.affectedRows != 0)){
        this._email.bifurcador('change_mail', null, this.form.value.email, null, codigo_hash);
        this.estadoSmt = 'ok';
        this._com.setNotifier({display: true, state:'alert-success', text:'Se ha enviado un código a tu nuevo correo electrónico. Verificalo!', time:3500})
        setTimeout(() => {
          this._router.navigate(['logout']);
        }, 3500);
      } else{
        this.estadoSmt = 'error';
        this._com.setNotifier({display: true, state:'alert-danger', text:'El correo electrónico no se ha podido actualizar. Intente nuevamente.', time:3500})
        setTimeout(() => {
          this.ngOnInit();
        }, 3500);
      }
    } );
  }

}
