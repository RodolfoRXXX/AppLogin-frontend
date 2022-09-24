import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-all-tag',
  templateUrl: './all-tag.component.html',
  styleUrls: ['./all-tag.component.css']
})
export class AllTagComponent implements OnInit {

  tag_personal_exist: boolean = false; //Se comprueba si hay un tag-ID personal creado
  tag_adic_persona_existe: boolean = false; //tag adicional persona
  tag_adic_mascota_existe: boolean = false; //tag adicional mascota
  tag_adic_vehiculo_existe: boolean = false; //tag adicional vehiculo
  error_carga_persona: boolean = false;
  error_carga_mascota: boolean = false;
  error_carga_vehiculo: boolean = false;
  load_tag_personal: boolean = false;
  load_tag_persona: boolean = false;
  load_tag_mascota: boolean = false;
  load_tag_vehiculo: boolean = false;
  userId: any;
  personas: Persona[];
  mascotas: mascota[];
  vehiculos: Vehiculo[];

  constructor(
    private _router: Router,
    private _com: ComunicationService,
    private _auth: AuthService,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.load_tag_personal = true;
    this.load_tag_persona = true;
    this.load_tag_mascota = true;
    this.load_tag_vehiculo = true;
    this._com.setTabEditor('Mis Tags');
    let data = this._auth.getUserId();
    if(data){
      this.userId = (JSON.parse(data));
      this._api.postTypeRequest('profile/getAllTags', {id:this.userId, tabla:"personas"}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data.length){
              this.personas = res.data;
              this.personas.forEach(element => {
                if (element.nivel == 'personal') {
                  this.tag_personal_exist = true;
                } else if(element.nivel == 'adicional'){
                  this.tag_adic_persona_existe = true;
                } else{
                  this.tag_personal_exist = true;
                  this.tag_adic_persona_existe = true;
                }
              });
            } else{
              this.tag_personal_exist = false;
              this.tag_adic_persona_existe = false;
            }  
          } else{
            //ventana de error
            this.error_carga_persona = true;
          }
        },
        error: (error) => {
          console.warn(error);
            //ventana de error
            this.error_carga_persona = true;
        },
        complete: () => {
          this.load_tag_personal = false;
          this.load_tag_persona = false;
        }
      });
      this._api.postTypeRequest('profile/getAllTags', {id:this.userId, tabla:"mascotas"}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data.length){
              this.mascotas = res.data;
              this.tag_adic_mascota_existe = true;
            } else{
              this.tag_adic_mascota_existe = false;
            }  
          } else{
            //ventana de error
            this.error_carga_mascota = true;
          }
        },
        error: (error) => {
          console.warn(error);
            //ventana de error
            this.error_carga_mascota = true;
            this.load_tag_mascota = false;
        },
        complete: () => {
          this.load_tag_mascota = false;
        }
      })
      this._api.postTypeRequest('profile/getAllTags', {id:this.userId, tabla:"vehiculos"}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data.length){
              this.vehiculos = res.data;
              this.tag_adic_vehiculo_existe = true;
            } else{
              this.tag_adic_vehiculo_existe = false;
            }  
          } else{
            //ventana de error
            this.error_carga_vehiculo = true;
          }
        },
        error: (error) => {
          console.warn(error);
            //ventana de error
            this.error_carga_vehiculo = true;
            this.load_tag_vehiculo = false;
        },
        complete: () => {
          this.load_tag_vehiculo = false;
        }
      })
    }
  }

  editTag(tipo:string, id:number){
      this._router.navigate([`profile/tags/edit-tag/${tipo}/${id}`]);
  }
  verTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/ver-tag/${tipo}/${id}`]);
  }
  vincularTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/vincular-tag/${tipo}/${id}`]);
}

}
