import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-email-checker',
  templateUrl: './email-checker.component.html',
  styleUrls: ['./email-checker.component.css']
})
export class EmailCheckerComponent implements OnInit {

  form: FormGroup;
  estadoSmt: string = 'verificar';
  displayLogin: boolean = false;
  classLogin: string;
  messageLogin: string;
  checkerDisplay: boolean = true;

  constructor(
    private _auth: AuthService,
    private _com: ComunicationService,
    private _router: Router
  ) { }

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
    console.log(this.form.value);
  }

  irModificar(){
    this.checkerDisplay = !this.checkerDisplay;
  }

  reenviarCodigo(){
    var data = this._auth.getUserDetails();
    if(data){
      let dataEmail = JSON.parse(data)[0].email;
      let dataCode = JSON.parse(data)[0].codeEmail;
      //LLAMAR A UNA FUNCION QUE ENVIE POR CORREO "dataEmail" EL "dataCode" y devuelva el estado del envío
      console.log(dataEmail, dataCode);
      this._com.setNotifier({display: true, state:'alert-success', text:'Se ha reenviado el código a tu correo electrónico!'})
    }
  }

}
