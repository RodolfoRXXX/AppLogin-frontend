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
  actual_code:string;
  state:boolean;

  constructor(
    private _api:ApiService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _com:ComunicationService
  ) { 
    this.estadoSmt = 'vincular';
    this.tag = { tipo:null, id:null };
    this.state = true;
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
              this.estadoSmt = 'desvincular';
              console.log(res.data)
              this.actual_code = res.data[0].codigo;
              this.form.patchValue({ codigo:res.data[0].codigo });
            }
          } else{
            //ventana de error
            this.state = false;
          }
        },
        error: (error) => {
          console.warn(error);
          //ventana de error
          this.state = false;
        },
        complete: () => {
        }
      })
      this.creaFormulario(this.tag.id, this.tag.tipo);
    })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'vincular';
    }
  }

  creaFormulario( id:any, tabla:string ){
    this.form = new FormGroup({
      id: new FormControl(id,
      [
        Validators.required
      ]),
      codigo: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      tabla: new FormControl(tabla,
      [
        Validators.required
      ])
    })
  }

  onSubmit(){
    console.log(this.form.value);
    if( this.estadoSmt == 'vincular'){
      //Vincular
        //(SELECT tablaqr) se debe comprobar que el código existe en tablaqr
        //si existe, devuelve el registro / si no existe, devuelve que no existe
        //(UPDATE personas/mascotas/vehiculos) el id del registro se actualiza en el registro de personas, mascotas o vehiculos
        //(UPDATE tablaqr) se actualiza el tipo(personas, mascotas o vehiculos) de ese registro en tablaqr
      this._api.postTypeRequest('profile/update-tag-link', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            console.log(res)
          } else{
            //ventana de error
            console.log(res)
          }
        },
        error: (error) => {
          console.warn(error);
          //ventana de error
          
        }
      })

    } else if( this.estadoSmt == 'desvincular' ){
      //desvincular
        //(SELECT tablaqr) se busca el registro en tablaqr
        //si no existe devuelve error / si existe, devuelve ok
        //(UPDATE personas/mascotas/vehiculos) borra el id_qr en personas, mascotas o vehiculos
        //(UPDATE tablaqr) borra el tipo de el registro en tablaqr
      this._api.postTypeRequest('profile/update-tag-unlink', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            
          } else{
            //ventana de error
            
          }
        },
        error: (error) => {
          console.warn(error);
          //ventana de error
          
        }
      })

    }
  }

  volver(){
    this._router.navigate(['profile/tags/all-tag']);
  }

}
