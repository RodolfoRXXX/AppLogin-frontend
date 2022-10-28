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

  estadoSmt:string;
  form:FormGroup;
  tag:any;
  state:string;
  unlink:boolean;
  view_tag:string;

  constructor(
    private _api:ApiService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _com:ComunicationService
  ) { 
    this.estadoSmt = 'vincular';
    this.tag = { tipo:null, id:null };
    this.state = 'load';
    this.unlink = false;
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
              this.form.patchValue({ codigo:res.data[0].codigo });
              this.unlink = true;
              this.state = 'ok';
            } else{
              this.estadoSmt = 'vincular';
              this.state = 'ok';
            }
          } else{
            //ventana de error
            this.state = 'error';
          }
        },
        error: (error) => {
          //ventana de error
          this.state = 'error';
        }
      })
      this.creaFormulario(this.tag.id, this.tag.tipo);
    })
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
    if( this.estadoSmt == 'vincular'){
      this.estadoSmt = 'load';
      //Vincular
      this._api.putTypeRequest('profile/update-tag-link', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.estadoSmt = 'link';
            this._com.setNotifier({display: true, state:'alert-success', text:'La vinculación fue un éxito!', time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this.estadoSmt = 'error';
            let text_error = 'Ha sucedido un error. Intentá nuevamente.';
            if(res.data == 'codigo inexistente'){
              text_error = 'El código ingresado no existe';
            }
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        },
        error: (error) => {
          //ventana de error
          this.estadoSmt = 'error';
        }
      })
    } else if( this.estadoSmt == 'desvincular' ){
      this.estadoSmt = 'load';
      //desvincular
      this._api.putTypeRequest('profile/update-tag-unlink', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.estadoSmt = 'nolink';
            this._com.setNotifier({display: true, state:'alert-success', text:'Desvinculaste el tag-qr.', time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this.estadoSmt = 'error';
            let text_error = 'Ha sucedido un error. Intentá nuevamente.';
            if(res.data == 'codigo inexistente'){
              text_error = 'El código ingresado no existe';
            }
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        },
        error: (error) => {
          //ventana de error
          this.estadoSmt = 'error';
        }
      })
    }
  }

}
