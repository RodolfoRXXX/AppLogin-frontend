import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {

  @ViewChild('modal_ubicacion') modal_ubicacion: ElementRef;

  userId:any;
  user:string;
  email:string;
  active:boolean;
  card_total:number;
  card_link:number;
  card_nolink:number;
  card_alert:number;
  state:string;
  state_box_alert:string;
  isFound:boolean;

  found_tags:any;

  constructor(
    private _auth: AuthService,
    private _api:ApiService,
    private _router:Router,
    private modalService: NgbModal
  ) {
    this.card_total = 0;
    this.card_link = 0;
    this.card_nolink = 0;
    this.card_alert = 0;
    this.state = 'load';
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
          if((res.data.personas.length + res.data.mascotas.length + res.data.vehiculos.length) > 0){
            this.found_tags = res.data;
            this.state_box_alert = 'ok';
            this.isFound = true;
          } else{
            this.isFound = false;
          }
          
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
        if(res.status == 1){
          //Ok;
          this.card_total = res.data.total;
          this.card_link = res.data.link;
          this.card_nolink = res.data.nolink;
          this.card_alert = res.data.alert;
          this.state = 'ok';
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


}
