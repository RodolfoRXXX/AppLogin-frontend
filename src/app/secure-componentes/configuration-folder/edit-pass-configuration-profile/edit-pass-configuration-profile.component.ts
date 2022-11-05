import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { EmailService } from 'src/app/services/email.service';
import { validarPass } from '../../function/functions';

@Component({
  selector: 'app-edit-pass-configuration-profile',
  templateUrl: './edit-pass-configuration-profile.component.html',
  styleUrls: ['./edit-pass-configuration-profile.component.css']
})
export class EditPassConfigurationProfileComponent implements OnInit {

  @ViewChild('InputCode') InputCode: ElementRef;
  form: FormGroup;
  estadoSmt: string;
  estadoValidacion: string;
  email_user: string;
  actual_code:string;
  envio:number;

  constructor( 
    private _auth: AuthService,
    private _api: ApiService,
    private _com: ComunicationService,
    private _router: Router,
    private _email: EmailService
  ) {
    this.estadoSmt = 'actualizar';
    this.estadoValidacion = 'verificar';
    this.envio = 0;
  }

  ngOnInit(): void {
    let data = this._auth.getUserDetails();
    if(data){
      this.crearFormulario(JSON.parse(data)[0].id);
      this.email_user = JSON.parse(data)[0].email;
    } else{
      this._router.navigate(['login']);
    }
  }

  crearFormulario( id:string ){
    this.form = new FormGroup({
      codigo: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]
      ),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      passwordRep: new FormControl('',
      [
        Validators.required
      ]
    ),
      id: new FormControl((id)?id:'',
      [
        Validators.required
      ]
    )
    }, { validators: validarPass })
  }

  verificarCodigo(code:string){
    this.estadoValidacion = 'loading';
    var true_code = this._auth.getUserDetails();
    (true_code)?(true_code = JSON.parse(true_code)[0].codeEmail):'';
    if(code===true_code){
      this.estadoValidacion = 'ok';
      this.InputCode.nativeElement.classList.add('is-valid');
      this.actual_code = code;
    } else{
      this.estadoValidacion = 'error';
      this.InputCode.nativeElement.classList.add('is-invalid');
    }
  }

  actualizarSmt(){
    if((this.estadoValidacion == 'error')||(this.estadoValidacion == 'ok')){
      this.estadoValidacion = 'verificar';
      this.InputCode.nativeElement.classList.remove('is-valid');
      this.InputCode.nativeElement.classList.remove('is-invalid');
    }
  }

  onSubmit(){
    this.estadoSmt = 'load';
    if(this.estadoValidacion == 'ok'){
      this._api.putTypeRequest('profile/update-password', this.form.value).subscribe( (res:any) => {
        if((res.status != 0)&&(res.data.affectedRows != 0)){
          this._email.bifurcador('change_pass', null, this.email_user, null, null);
          this.estadoSmt = 'ok';
          this._com.setNotifier({display: true, state:'alert-success', text:'La contraseña se ha actualizado con éxito!', time:3500})
          setTimeout(() => {
            this._router.navigate(['logout']);
          }, 3500);
        } else{
          this.estadoSmt = 'error';
          this._com.setNotifier({display: true, state:'alert-danger', text:'La contraseña no se ha podido actualizar. Intente nuevamente.', time:3500})
          setTimeout(() => {
            this.ngOnInit();
          }, 3500);
        }
      });
    }
  }

  enviar_codigo(){
    this.envio = 1;
    this._email.bifurcador('verificate', null, this.email_user, null, this.actual_code );
    this._com.setNotifier({display: true, state:'alert-success', text:'Se envió el código a tu correo electrónico.', time:2500})
          setTimeout(() => {
            this.envio = 2;
          }, 2500);
  }

}
