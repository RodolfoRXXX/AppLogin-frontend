import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { globalVariable } from 'src/app/entidades/global_variables';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {

  link = globalVariable.LINK;
  nolink = globalVariable.NOLINK;
  alert = globalVariable.ALERT;

  @ViewChild('modal_ubicacion') modal_ubicacion: ElementRef;

  userId:any;
  user:string;
  email:string;
  active:boolean;
  card_creados:any[];
  card_link:any[];
  card_nolink:any[];
  card_alert:any[];
  state_creados:string;
  state_link:string;
  state_nolink:string;
  state_alert:string;
  state_box_alert:string;
  isFound:boolean;

  found_tags:any;

  constructor(
    private _auth: AuthService,
    private _api:ApiService,
    private _router:Router,
    private modalService: NgbModal
  ) {
    this.card_creados = [];
    this.card_link = [];
    this.card_nolink = [];
    this.card_alert = [];
    this.state_creados = 'load';
    this.state_link = 'load';
    this.state_nolink = 'load';
    this.state_alert = 'load';
    this.state_box_alert = 'load';
    this.isFound = false;
  }


  ngOnInit(): void {
    let data = this._auth.getUserDetails();
    if(data){
      this.user = JSON.parse(data)[0].nombre;
      this.email = JSON.parse(data)[0].email;
      this.userId = JSON.parse(data)[0].id;
      (JSON.parse(data)[0].active == 1)?(this.active = true):(this.active = false);
      this.carga_tags_encontrados(this.userId);
      this.cargar_tarjetas(this.userId);
    }
  }

  

  carga_tags_encontrados(id:any){
    this._api.postTypeRequest('profile/get-found-tag', {id}).subscribe({
      next: (res: any) => {
        if(res.status == 1){
          //Ok
          if((res.data.length) > 0){
            this.found_tags = res.data;
            this.isFound = true;
          } else{
            this.isFound = false;
          }
          this.state_box_alert = 'ok';
        } else{
          //ventana de error
          this.state_box_alert = 'error';
        }
      },
      error: (error) => {
        //ventana de error
        this.state_box_alert = 'error';
      }
    })
  }

  cargar_tarjetas(id:any){
    this._api.postTypeRequest('profile/get-data-card', {id}).subscribe({
      next: (res: any) => {
        console.log(res.data);
        if(res.status == 1){
          //Ok;
          if(res.data.creados.length){
            this.card_creados = res.data.creados;
            this.state_creados = 'ok';
          } else{
            this.state_creados = 'empty';
          }

          if(res.data.link.length){
            this.card_link = res.data.link;
            this.state_link = 'ok';
          } else{
            this.state_link = 'empty';
          }

          if(res.data.nolink.length){
            this.card_nolink = res.data.nolink;
            this.state_nolink = 'ok';
          } else{
            this.state_nolink = 'empty';
          }

          if(res.data.alert.length){
            this.card_alert = res.data.alert;
            this.state_alert = 'ok';
          } else{
            this.state_alert = 'empty';
          }

        } else{
          //ventana de error
          this.state_creados = 'error';
          this.state_link = 'error';
          this.state_nolink = 'error';
          this.state_alert = 'error';
        }
      },
      error: (error) => {
        //ventana de error
        this.state_creados = 'error';
        this.state_link = 'error';
        this.state_nolink = 'error';
        this.state_alert = 'error';
      }
    })
  }

  ver_ubicacion(){
    this.modalService.open(this.modal_ubicacion, { centered: true });
  }

  activar_cuenta(){
    this._router.navigate(['verificate']);
  }

  configurar_email(){
    this._router.navigate(['profile/configuration']);
  }

  ver_tags(){
    this._router.navigate(['profile/tags/all-tag']);
  }


}
