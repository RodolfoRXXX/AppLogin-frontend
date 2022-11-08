import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-checker',
  templateUrl: './email-checker.component.html',
  styleUrls: ['./email-checker.component.css']
})
export class EmailCheckerComponent implements OnInit {

  form: FormGroup;
  estadoSmt: string;
  displayLogin: boolean;
  classLogin: string;
  messageLogin: string;
  checkerDisplay: boolean;

  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _com: ComunicationService,
    private _router: Router,
    private _email: EmailService
  ) {
    this.estadoSmt = 'verificar';
    this.displayLogin = false;
    this.checkerDisplay = true;
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
      1:new FormControl('',
        [
          Validators.required
        ]
      ),
      2:new FormControl('',
        [
          Validators.required
        ]
      ),
      3:new FormControl('',
        [
          Validators.required
        ]
      ),
      4:new FormControl('',
        [
          Validators.required
        ]
      ),
      5:new FormControl('',
        [
          Validators.required
        ]
      ),
      6:new FormControl('',
        [
          Validators.required
        ]
      ),
      codeEmail: new FormControl(''),
      id: new FormControl((id)?id:'')
    })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'verificar';
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
    this.form.controls['codeEmail'].setValue(
      this.form.get('1')?.value+
      this.form.get('2')?.value+
      this.form.get('3')?.value+
      this.form.get('4')?.value+
      this.form.get('5')?.value+
      this.form.get('6')?.value
    );
    this._api.putTypeRequest('profile/verificate-user', this.form.value).subscribe( (res:any) => {
      if ((res.status)&&(res.status != 0)){
        if(res.data != 'error'){
          this.estadoSmt = 'ok';
          this.estadoLogin(true, 'alert-success', 'Código correcto!');
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('token', res.token);
          setTimeout(() => {
            this._router.navigate(['profile']);
          }, 1500);
        } else{
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-danger', 'Código incorrecto. Intentá nuevamente.');
        }
          
      } else{
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido verificar el código. Intentá nuevamente.');
      }
    });
  }

  irModificar(){
    this.checkerDisplay = !this.checkerDisplay;
  }

  reenviarCodigo(){
    var data = this._auth.getUserDetails();
    if(data){
      let dataEmail = JSON.parse(data)[0].email;
      let dataCode = JSON.parse(data)[0].codeEmail;
      this._email.bifurcador('verificate', null, dataEmail, null, dataCode);
      this._com.setNotifier({display: true, state:'alert-success', text:'Se ha reenviado el código a tu correo electrónico!', time:3500})
    }
  }

  fast_logout(){
    this._router.navigate(['logout']);
  }

}
