import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { globalVariable } from 'src/app/entidades/global_variables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-tag',
  templateUrl: './all-tag.component.html',
  styleUrls: ['./all-tag.component.css']
})
export class AllTagComponent implements OnInit {

  link = globalVariable.LINK;
  nolink = globalVariable.NOLINK;
  alert = globalVariable.ALERT;

  @ViewChild('modal_confirmacion') modal_confirmacion: ElementRef;
  texto_confirmacion:string;
  tag_eliminar:any;

  tag_personal_existe: boolean; //Se comprueba si hay un tag-ID personal creado
  tag_adic_persona_existe: boolean; //tag adicional persona
  tag_adic_mascota_existe: boolean; //tag adicional mascota
  tag_adic_vehiculo_existe: boolean; //tag adicional vehiculo
  error_carga_personal: boolean;
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
    private _api: ApiService,
    private modalService: NgbModal,
  ) { 
    this.tag_personal_existe = false;
    this.tag_adic_persona_existe = false;
    this.tag_adic_mascota_existe = false;
    this.tag_adic_vehiculo_existe = false;
    this.error_carga_personal = false;
    this.error_carga_persona = false;
    this.error_carga_mascota = false;
    this.error_carga_vehiculo = false;
    this.load_tag_personal = true;
    this.load_tag_persona = true;
    this.load_tag_mascota = true;
    this.load_tag_vehiculo = true;
    this.tag_eliminar = {id:null, nivel:null, tabla:null};
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
                this.tag_personal_existe = true;
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
              this.tag_personal_existe = false;
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
            this.error_carga_personal = true;
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
            this.error_carga_personal = true;
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

  //maneja el modal de confirmacion de eliminación
  abrir_confirmar(texto:string){
    this.texto_confirmacion = 'Estás seguro de eliminar el tag de ' + texto + '?';
    this.modalService.open(this.modal_confirmacion, { centered: true, size: 'sm' });
  }
  cerrar_confirmar( value:boolean){
    switch (this.tag_eliminar.nivel) {
      case 'personal':
        this.tag_personal_existe = false;
        this.load_tag_personal = true;
        break;
      case 'persona':
        this.tag_adic_persona_existe = false;
        this.load_tag_persona = true;
        break;
      case 'mascota':
        this.tag_adic_mascota_existe = false;
        this.load_tag_mascota = true;
        break;
      case 'vehiculo':
        this.tag_adic_vehiculo_existe = false;
        this.load_tag_vehiculo = true;
        break;
    }
    this.modalService.dismissAll();
    let text_error = 'Ha sucedido un error. Intentá nuevamente.';
    if(value){
      this._api.postTypeRequest('profile/delete-tag', this.tag_eliminar).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this._com.setNotifier({display: true, state:'alert-success', text:'El tag se ha eliminado con éxito!', time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
            this.tag_eliminar = {id:null, nivel:null, tipo:null};
          } else{
            //ventana de error
            this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
            this.tag_eliminar = {id:null, nivel:null, tipo:null};
          }
        },
        error: (error) => {
          //ventana de error
          this._com.setNotifier({display: true, state:'alert-danger', text:text_error, time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
            this.tag_eliminar = {id:null, nivel:null, tipo:null};
        }
      })
    }
  }

  editTag(tipo:string, nivel:string, id:number){
      this._router.navigate([`profile/tags/edit-tag/${tipo}/${nivel}/${id}`]);
  }
  alertarTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/alert-tag/${tipo}/${id}`]);
  }
  eliminarTag(tabla:string, nivel:string, texto:string, id:number){
    this.tag_eliminar.id = id;
    this.tag_eliminar.nivel = nivel;
    this.tag_eliminar.tabla = tabla;
    this.abrir_confirmar(texto);
  }
  vincularTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/link-tag/${tipo}/${id}`]);
}

}
