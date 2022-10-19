import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResolveStart, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { validarPass } from '../../function/functions';
import { md5 } from '../../function/md5';

@Component({
  selector: 'app-edit-pass-configuration-profile',
  templateUrl: './edit-pass-configuration-profile.component.html',
  styleUrls: ['./edit-pass-configuration-profile.component.css']
})
export class EditPassConfigurationProfileComponent implements OnInit {

  @ViewChild('oldPasswordInput') oldPasswordInput: ElementRef;
  form: FormGroup;
  estadoSmt: string;
  estadoValidacion: string;

  constructor( 
    private _auth: AuthService,
    private _api: ApiService,
    private _com: ComunicationService,
    private _router: Router
  ) {
    this.estadoSmt = 'actualizar';
    this.estadoValidacion = 'verificar';
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
      oldpassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
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

  verificarPasswordActual(oldPassword:string){
    this.estadoValidacion = 'loading';
    var pass = this._auth.getUserDetails();
    (pass)?(pass = JSON.parse(pass)[0].password):'';
    let e = md5(oldPassword);
    if(e===pass){
      this.estadoValidacion = 'ok';
      this.oldPasswordInput.nativeElement.classList.add('is-valid');
    } else{
      this.estadoValidacion = 'error';
      this.oldPasswordInput.nativeElement.classList.add('is-invalid');
    }
  }

  actualizarSmt(){
    if((this.estadoValidacion == 'error')||(this.estadoValidacion == 'ok')){
      this.estadoValidacion = 'verificar';
      this.oldPasswordInput.nativeElement.classList.remove('is-valid');
      this.oldPasswordInput.nativeElement.classList.remove('is-invalid');
    }
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.putTypeRequest('profile/updatepassword', this.form.value).subscribe( (res:any) => {
      if((res.status != 0)&&(res.data.affectedRows != 0)){
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
    } );
  }

}
