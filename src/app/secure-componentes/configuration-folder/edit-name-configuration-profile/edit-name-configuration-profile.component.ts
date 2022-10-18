import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-edit-name-configuration-profile',
  templateUrl: './edit-name-configuration-profile.component.html',
  styleUrls: ['./edit-name-configuration-profile.component.css']
})
export class EditNameConfigurationProfileComponent implements OnInit {

  form: FormGroup;
  estadoSmt: string;

  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _com: ComunicationService,
    private _router: Router
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
      nombre: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ]),
      id: new FormControl((id)?id:'',
        [
          Validators.required
        ])
    })
  }

  actualizarSmt(){
    if((this.estadoSmt == 'error')||(this.estadoSmt == 'ok')){
      this.estadoSmt = 'actualizar';
    }
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.putTypeRequest('profile/update-username', this.form.value).subscribe( (res:any) => {
      if((res.status != 0)&&(res.data.affectedRows != 0)){
        this.estadoSmt = 'ok';
        this._com.setNotifier({display: true, state:'alert-success', text:'El nombre de usuario se ha modificado con éxito!', time:3500})
        setTimeout(() => {
          this._router.navigate(['logout']);
        }, 3500);
      } else{
        this.estadoSmt = 'error';
        this._com.setNotifier({display: true, state:'alert-danger', text:'Ocurrió un error. Intentá nuevamente.', time:3500})
        setTimeout(() => {
          this.ngOnInit();
        }, 3500);
      }
    } );
  }

}
