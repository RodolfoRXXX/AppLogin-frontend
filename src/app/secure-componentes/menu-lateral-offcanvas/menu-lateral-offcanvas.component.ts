import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import {NgbModal, NgbModalConfig, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'menu-lateral-offcanvas',
  templateUrl: './menu-lateral-offcanvas.component.html',
  styleUrls: ['./menu-lateral-offcanvas.component.css']
})
export class NgbdOffcanvasBasic implements OnInit {
  @ViewChild(TemplateRef) content: '#content';
  user: string;
  texto_sesion: string;
  @ViewChild('modal_sesion') modal_sesion: ElementRef;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private _com: ComunicationService,
    private _auth: AuthService,
    private _router:Router,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    this.user = '';
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getUser();
    this._com.getMenuOffCanvas().subscribe( () => {
      this.open();
    } )
  };

  open() {
    if(!this.offcanvasService.hasOpenOffcanvas()){
      this.offcanvasService.open(this.content);
    }
  }

  getUser(){
    let data = this._auth.getUserDetails();
    if(data){
      (data)?(this.user = JSON.parse(data)[0].nombre):'';
    }
  }

  cerrar_sesion(){
    this.texto_sesion = 'Estas por salir de la sesión';
      this.modalService.open(this.modal_sesion, { centered: true, size: 'sm' });
  }
  confirma_sesion(e:boolean){
    this.modalService.dismissAll();
      if(e){
        this._router.navigate(['logout']);
      }
  }

}