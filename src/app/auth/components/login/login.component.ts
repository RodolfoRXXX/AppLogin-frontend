import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator } from '../../function/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: any;
  form: FormGroup;
  estadoSmt: string = 'ingreso';

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
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
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    })
  }

  actualizarSmt(){
    (this.estadoSmt == 'error')?(this.estadoSmt = 'ingreso'):'';
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.postTypeRequest('user/login', this.form.value).subscribe( (res:any) => {
      if (res.status) {
        this.estadoSmt = 'ok';
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['home']);
      } else{
        this.estadoSmt = 'error';
      }
    } )
  }

  irRegistro(){
    this._router.navigate(['register']);
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['']);
  }

}
