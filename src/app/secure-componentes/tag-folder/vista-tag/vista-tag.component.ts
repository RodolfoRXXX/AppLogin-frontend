import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { emergencias_personas, em_persona } from 'src/app/entidades/array_emergencias_personas';
import { array_social, social } from 'src/app/entidades/array_social';
import { globalVariable } from 'src/app/entidades/global_variables';
import { social_data } from 'src/app/entidades/social_form';
import { ApiService } from 'src/app/services/api.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { EmailService } from 'src/app/services/email.service';
import { LocationServiceService } from 'src/app/services/location-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-tag',
  templateUrl: './vista-tag.component.html',
  styleUrls: ['./vista-tag.component.css']
})
export class VistaTagComponent implements OnInit {

  link = globalVariable.LINK;
  nolink = globalVariable.NOLINK;
  alert = globalVariable.ALERT;

  @ViewChild('modal_posicion') modal_posicion: ElementRef;

  @Input() datos:any;
  @Input() tipo:string;

  redes: social[];
  sociales: social_data[];
  usuario:string;
  leaf_selected:string;
  foto_perfil:string;
  view_tag:string;
  
  cards_emergency:any[];

  id_user:number;
  id_autor:number;
  position:any = {
    latitud:null,
    longitud:null,
    fecha:null
  }

  constructor(
    private _route: ActivatedRoute,
    private _api: ApiService,
    private _router: Router,
    private _com: ComunicationService,
    private _location: LocationServiceService,
    private _email: EmailService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    this.leaf_selected = 'data';
    this.foto_perfil = '../../../../assets/img/blanck_persona.png';
    this.usuario = '';
    this.redes = array_social;
    this.sociales = [];
    this.view_tag = 'load';

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    if((!this.tipo)||(!this.datos)){
      this._route.queryParams.subscribe( (params:any) => {
        if(!params.code){
          //ruta no completa luego de "view-tag"
          this._router.navigate(['page-not-found']);
        } else{
          //Hay al menos un valor del parámetro "code" 
          this._api.postTypeRequest('user/get-tag-out', {code:params.code}).subscribe({
            next: (res: any) => {
              if(res.status != 1){
                switch (res.data) {
                  case 'noqr':
                    //qr inexistente en la db
                    this.view_tag = 'noqr';
                    break;
                  case 'nolink':
                    //qr libre
                    this.view_tag = 'nolink';
                    setTimeout(() => {
                      this._router.navigate(['home']);
                    }, 3000);
                    break;
                  default:
                    //error genérico o no encuentra el tag de dicho qr, actualiza
                    this.view_tag = 'error';
                    break;
                }
              } else{
                this.carga_datos( res.tipo, res.data[0] )
                this.view_tag = 'ok';
              }
            },
            error: (error) => {
                //ventana de error
                this.view_tag = 'error';
            }
          })
        }
      })
    } else{
      this.carga_datos( this.tipo, this.datos )
    }
  }

  carga_datos( tipo:string, datos:any ){
    this.tipo = tipo;
    this.datos = datos;
    this.id_user = datos.id;
    this.id_autor = datos.id_autor;
    switch (tipo) {
      case 'personas' :
        (datos.foto != '')?(this.foto_perfil = environment.SERVER + datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_persona.png'); 
        this.usuario = datos.nombre + ' ' + datos.apellido;
        this.sociales = (datos.red != '')?JSON.parse(datos.red):[];
        this.view_tag = 'ok';
        this.cards_emergency = emergencias_personas;
        break;
      case 'mascotas' :
        (datos.foto != '')?(this.foto_perfil = environment.SERVER + datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_mascota.png');
        this.usuario = datos.nombre;
        this.view_tag = 'ok';
        break;
      case 'vehiculos' :
        (datos.foto != '')?(this.foto_perfil = environment.SERVER + datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_vehiculo.png');
        this.usuario = datos.marca + ' ' + datos.modelo;
        this.view_tag = 'ok';
        break;
      default:
        //Error!!!
        this.view_tag = 'error';
        break;
    }
  }

  select_leaf(text:string){
    this.leaf_selected = text;
  }

  get_position(){
    this.modalService.open(this.modal_posicion, { centered: true, size: 'sm' });
  }

  confirm_position(e:any){
    if(e){
      this._location.getPosition().then(pos => {
        this.position.latitud = pos.lat;
        this.position.longitud = pos.lng;
        this.position.fecha = pos.date;
      })
      .then(() => {
        this._api.postTypeRequest('user/set-position-tag', {tipo:this.tipo, id_user:this.id_user, data:JSON.stringify(this.position)}).subscribe({
          next: (res: any) => {
            if(res.status == 1){
              this._email.bifurcador('marker', this.id_autor, null, null, null);
              this._com.setNotifier({display: true, state:'alert-success', text:"La ubicación se envió con éxito. Gracias por tu ayuda!", time:3500})
            } else{
              //error
              this._com.setNotifier({display: true, state:'alert-danger', text:'Ha sucedido un error. Intentá nuevamente.', time:2500})
            }
          },
          error: (error) => {
              //error
              this._com.setNotifier({display: true, state:'alert-danger', text:'Ha sucedido un error. Intentá nuevamente.', time:2500})
          },
          complete: () => {
            this.modalService.dismissAll();
          }
        })
      })
      .catch(err => {
        //error
        console.log(err)
        this._com.setNotifier({display: true, state:'alert-danger', text:'Ha sucedido un error. Intentá nuevamente.', time:2500})
      })
    } else{
      this.modalService.dismissAll();
    }
  }

}
