import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { array_social, social } from 'src/app/entidades/array_social';
import { globalVariable } from 'src/app/entidades/global_variables';
import { social_data } from 'src/app/entidades/social_form';
import { ApiService } from 'src/app/services/api.service';
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

  @Input() datos:any;
  @Input() tipo:string;

  redes: social[];
  sociales: social_data[];
  usuario:string;
  leaf_selected:string;
  foto_perfil:string;
  view_tag:string;

  constructor(
    private _route:ActivatedRoute,
    private _api:ApiService,
    private _router:Router
  ) { 
    this.leaf_selected = 'data';
    this.foto_perfil = '../../../../assets/img/blanck_persona.png';
    this.usuario = '';
    this.redes = array_social;
    this.sociales = [];
    this.view_tag = 'load';
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
    switch (tipo) {
      case 'personas' :
        (datos.foto != '')?(this.foto_perfil = environment.SERVER + datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_persona.png'); 
        this.usuario = datos.nombre + ' ' + datos.apellido;
        this.sociales = (datos.red != '')?JSON.parse(datos.red):[];
        this.view_tag = 'ok';
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

}
