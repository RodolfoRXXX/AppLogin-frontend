import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-alert-tag',
  templateUrl: './alert-tag.component.html',
  styleUrls: ['./alert-tag.component.css']
})
export class AlertTagComponent implements OnInit {

  form:FormGroup;
  estadoSmt_crear:string;
  estadoSmt_eliminar:string;
  estadoSmt_editar:string;
  tag:any;
  state:boolean;
  create_alert:boolean
  actual_obs:string;
  texto_confirmacion:string;

  @ViewChild('modal_confirmacion') modal_confirmacion: ElementRef;
  fecha:any;

  constructor(
    private _router:Router,
    private _com:ComunicationService,
    private _activatedRoute: ActivatedRoute,
    private _api:ApiService,
    private modalService: NgbModal
  ) { 
    this.estadoSmt_crear = 'crear';
    this.estadoSmt_eliminar = 'eliminar';
    this.estadoSmt_editar = 'editar';
    this.tag = { tipo:null, id:null };
    this.state = true;
    this.create_alert = true;
    this.fecha = (new Date).toLocaleDateString();
  }

  //maneja el modal de confirmacion de eliminación
  abrir_confirmar(){
    this.texto_confirmacion = 'Estás seguro que desea eliminar este alerta?';
    this.modalService.open(this.modal_confirmacion, { centered: true, size: 'sm' });
  }
  cerrar_confirmar( value:boolean){
    this.modalService.dismissAll();
    if(value){
      //Eliminando un alerta
      this.estadoSmt_eliminar = 'load';
      this._api.putTypeRequest('profile/delete-tag-alert', this.tag).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.estadoSmt_eliminar = 'eliminado';
            this._com.setNotifier({display: true, state:'alert-success', text:'El alerta se ha eliminado!', time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this.estadoSmt_eliminar = 'error';
            let text_error = 'Ha sucedido un error. Intentá nuevamente.';
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        },
        error: (error) => {
          //ventana de error
          this.state = false;
        }
      })
    }
  }

  ngOnInit(): void {
    this._com.setTabEditor('Edición de alertas');
    this._activatedRoute.params.subscribe( (params: Params) => {
      this.tag.tipo = params['tipo'];
      this.tag.id   = params['id'];
      this._api.postTypeRequest('profile/get-tag-alert', {id:params['id'], tabla:params['tipo']}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data[0].estado == 'alert'){
              this.create_alert = false;
              this.form.patchValue({ obsestado:res.data[0].obsestado });
              this.form.patchValue({ fechaestado:res.data[0].fechaestado });
              this.actual_obs = res.data[0].obsestado;
            }
          } else{
            //ventana de error
            this.state = false;
          }
        },
        error: (error) => {
          //ventana de error
          this.state = false;
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
      obsestado: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      fechaestado: new FormControl(this.fecha,
      [
        Validators.required
      ]
      ),
      tabla: new FormControl(tabla,
      [
        Validators.required
      ])
    })
  }

  confirmar_eliminar(){
    this.abrir_confirmar();
  }

  onSubmit(){
    if(this.create_alert){
      //Creando alerta
      this.estadoSmt_crear = 'load';
      this._api.putTypeRequest('profile/create-tag-alert', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.estadoSmt_crear = 'creado';
            this._com.setNotifier({display: true, state:'alert-success', text:'El alerta se ha creado con éxito!', time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this.estadoSmt_crear = 'error';
            let text_error = 'Ha sucedido un error. Intentá nuevamente.';
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        },
        error: (error) => {
          //ventana de error
          this.state = false;
        }
      })
    } else{
      //Editando alerta
      this.estadoSmt_editar = 'load';
      this._api.putTypeRequest('profile/edit-tag-alert', this.form.value).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.estadoSmt_editar = 'editado';
            this._com.setNotifier({display: true, state:'alert-success', text:'El alerta se ha modificado con éxito!', time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this.estadoSmt_editar = 'error';
            let text_error = 'Ha sucedido un error. Intentá nuevamente.';
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        },
        error: (error) => {
          //ventana de error
          this.state = false;
        }
      })
    }
  }

}
