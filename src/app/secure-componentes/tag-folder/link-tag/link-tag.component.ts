import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-link-tag',
  templateUrl: './link-tag.component.html',
  styleUrls: ['./link-tag.component.css']
})
export class LinkTagComponent implements OnInit {

  userId:any;
  estadoSmt:string;
  form:FormGroup;
  tag:any;

  constructor(
    private _auth:AuthService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _com:ComunicationService
  ) { 
    this.estadoSmt = 'vincular';
    this.tag = { tipo:null, id:null };
   }

  ngOnInit(): void {
    this._com.setTabEditor('Vinculando Tag');
    this._activatedRoute.params.subscribe( (params: Params) => {
      this.tag.tipo = params['tipo'];
      this.tag.id   = params['id'];


      this.creaFormulario();
    })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'vincular';
    }
  }

  creaFormulario(){
    this.form = new FormGroup({
      codigo: new FormControl('',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(11)
      ])
    })
  }

  onSubmit(){

  }

  volver(){
    this._router.navigate(['profile/tags/all-tag']);
  }

}
