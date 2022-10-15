import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { globalVariable } from 'src/app/entidades/global_variables';

@Component({
  selector: 'app-all-tag',
  templateUrl: './all-tag.component.html',
  styleUrls: ['./all-tag.component.css']
})
export class AllTagComponent implements OnInit {

  link = globalVariable.LINK;
  nolink = globalVariable.NOLINK;
  alert = globalVariable.ALERT;

  tag_personal_exist: boolean; //Se comprueba si hay un tag-ID personal creado
  tag_adic_persona_existe: boolean; //tag adicional persona
  tag_adic_mascota_existe: boolean; //tag adicional mascota
  tag_adic_vehiculo_existe: boolean; //tag adicional vehiculo
  error_carga_persona: boolean;
  error_carga_mascota: boolean;
  error_carga_vehiculo: boolean;
  load_tag_personal: boolean;
  load_tag_persona: boolean;
  load_tag_mascota: boolean;
  load_tag_vehiculo: boolean;
  userId: any;
  personas: Persona[];
  mascotas: mascota[];
  vehiculos: Vehiculo[];

  constructor(
    private _router: Router,
    private _com: ComunicationService,
    private _auth: AuthService,
    private _api: ApiService
  ) { 
    this.tag_personal_exist = false;
    this.tag_adic_persona_existe = false;
    this.tag_adic_mascota_existe = false;
    this.tag_adic_vehiculo_existe = false;
    this.error_carga_persona = false;
    this.error_carga_mascota = false;
    this.error_carga_vehiculo = false;
    this.load_tag_personal = true;
    this.load_tag_persona = true;
    this.load_tag_mascota = true;
    this.load_tag_vehiculo = true;
   }

  ngOnInit(): void {
    this._com.setTabEditor('Mis Tags');
    let data = this._auth.getUserId();
    if(data){
      this.userId = (JSON.parse(data));
      this.datos_tag( this.userId, 'personas' );
      this.datos_tag( this.userId, 'mascotas' );
      this.datos_tag( this.userId, 'vehiculos', );
    }
  }

  //Función que pide los datos de las tag a la db
    datos_tag( id_user:number, tabla:string){
      if(tabla == 'personas'){
        this.load_tag_personal = true;
        this.load_tag_persona = true;
      } else if(tabla == 'mascotas'){
        this.load_tag_mascota = true;
      } else if(tabla == 'vehiculos'){
        this.load_tag_vehiculo = true;
      }
      this._api.postTypeRequest('profile/get-all-tag', {id:id_user, tabla:tabla}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data.length){
              let usuario = res.data;
              if(tabla == 'personas'){
                this.personas = res.data
              } else if(tabla == 'mascotas'){
                this.mascotas = res.data;
              } else if(tabla == 'vehiculos'){
                this.vehiculos = res.data;
              }
              usuario.forEach( (element:any) => {
                if (element.nivel == 'personal') {
                  this.tag_personal_exist = true;
                } else if(element.nivel == 'adicional'){
                  if(tabla == 'personas'){
                      this.tag_adic_persona_existe = true;
                  } else if(tabla == 'mascotas'){
                      this.tag_adic_mascota_existe = true;
                  } else if(tabla == 'vehiculos'){
                      this.tag_adic_vehiculo_existe = true;
                  }
                }
              });
            } else{
              if(tabla == 'personas'){
                this.tag_personal_exist = false;
                this.tag_adic_persona_existe = false;
              } else if(tabla == 'mascotas'){
                this.tag_adic_mascota_existe = false;
              } else if(tabla == 'vehiculos'){
                this.tag_adic_vehiculo_existe = false;
              }
            }  
          } else{
            //ventana de error
            if(tabla == 'personas'){
              this.error_carga_persona = true;
            } else if(tabla == 'mascotas'){
              this.error_carga_mascota = true;
            } else if(tabla == 'vehiculos'){
              this.error_carga_vehiculo = true;
            }
          }
        },
        error: (error) => {
            //ventana de error
            if(tabla == 'personas'){
              this.load_tag_personal = false;
              this.load_tag_persona = false;
              this.error_carga_persona = true;
            } else if(tabla == 'mascotas'){
              this.load_tag_mascota = false;
              this.error_carga_mascota = true;
            } else if(tabla == 'vehiculos'){
              this.load_tag_vehiculo = false;
              this.error_carga_vehiculo = true;
            }
        },
        complete: () => {
          if(tabla == 'personas'){
            this.load_tag_personal = false;
            this.load_tag_persona = false;
          } else if(tabla == 'mascotas'){
            this.load_tag_mascota = false;
          } else if(tabla == 'vehiculos'){
            this.load_tag_vehiculo = false;
          }
        }
      });
    }

  editTag(tipo:string, id:number){
      this._router.navigate([`profile/tags/edit-tag/${tipo}/${id}`]);
  }
  alertarTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/alert-tag/${tipo}/${id}`]);
  }
  eliminarTag(tipo:string, id:number){
    
  }
  vincularTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/link-tag/${tipo}/${id}`]);
}

}
