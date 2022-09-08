import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator } from '../../function/functions';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  estadoSmt: string = 'envio';
  isLogin: boolean = false;
  displayLogin: boolean = false;
  messageLogin: string;
  classLogin: string;
  form: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.creaFormulario();
  }

  creaFormulario(){
    this.form = new FormGroup({
      email: new FormControl('',
      [
        Validators.required,
        emailValidator()
      ])
    })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'envio';
      this.estadoLogin(false, '', '');
    }
  }

  estadoLogin( display:boolean, clase:string, message:string ){
    this.displayLogin = display;
    this.classLogin = clase;
    this.messageLogin = message;
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.postTypeRequest('user/forgot', this.form.value).subscribe( (res:any) => {
      if ((res.status)&&(res.status != 0)){
        if(res.data.length > 0){
          this.estadoSmt = 'ok';
          //aquí se debe llamar a una función que envíe un correo
          this.estadoLogin(true, 'alert-success', 'Los datos han sido enviados a tu cuenta de correo electrónico.');
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 2500);
        } else{
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-danger', 'Correo electrónico no encontrado.');
        }
      } else{
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido conectar con la base de datos. Intente nuevamente.');
      }
    });
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  irLogin(){
    this._router.navigate(['login']);
  }

}
