import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator, validarPass} from '../../function/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  estadoSmt: string = 'registro';
  isLogin: boolean = false;
  errorMessage: any;
  form: FormGroup;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.crearFormulario();
  }

  crearFormulario(){
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
      ]),
      passwordRep: new FormControl('',
      [
        Validators.required
      ]),
      rol: new FormControl('',
      [
        Validators.required
      ])
    }, { validators: validarPass })
  }

  actualizarSmt(){
    (this.estadoSmt == 'error')?(this.estadoSmt = 'registro'):'';
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.postTypeRequest('user/register', this.form.value).subscribe( (res:any) => {
      if (res.status) {
        console.log(res);
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['home']);
        this.estadoSmt = 'ok';
      } else{
        console.log(res)
        alert(res.msg)
        this.estadoSmt = 'error';
      }
    });
  }

  irLogin(){
    this._router.navigate(['login']);
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

}
