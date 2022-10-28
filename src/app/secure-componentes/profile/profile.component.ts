import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('modal_sesion') modal_sesion: ElementRef;

  public protectedData: any;
  public loading: boolean;
  user: string;
  texto_sesion: string;

  constructor(
    private _auth: AuthService,
    private _router:Router,
    private _com:ComunicationService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    this.loading = false;
    this.user = '';
    config.backdrop = 'static';
    config.keyboard = false;
    this.texto_sesion = 'Estas por salir de la sesión';
  }

  ngOnInit(): void {
    this.getUser();
    this._com.getCloseSession().subscribe(() => {
      this.modalService.open(this.modal_sesion, { centered: true, size: 'sm' });
    })
  }

  getUser(){
    let data = this._auth.getUserDetails();
    if(data){
      (data)?(this.user = JSON.parse(data)[0].nombre):'';
    }
  }

  confirma_sesion(e:boolean){
    this.modalService.dismissAll();
      if(e){
        this._router.navigate(['logout']);
      }
  }

}
