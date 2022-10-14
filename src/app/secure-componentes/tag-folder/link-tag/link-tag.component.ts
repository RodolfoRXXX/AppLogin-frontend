import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ApiService } from 'src/app/services/api.service';

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
    private _api:ApiService,
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
      this._api.postTypeRequest('profile/get-tag-link', {id:params['id'], tabla:params['tipo']}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data != 'nolink'){
              console.log(res.data)
              this.form.patchValue({ codigo:res.data[0].codigo });
            }
          } else{
            //ventana de error

          }
        },
        error: (error) => {
          console.warn(error);
            //ventana de error

        },
        complete: () => {
        }
      })
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
    console.log(this.form.value);
  }

  volver(){
    this._router.navigate(['profile/tags/all-tag']);
  }

}
