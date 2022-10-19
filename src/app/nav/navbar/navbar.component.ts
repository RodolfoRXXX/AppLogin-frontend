import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  texto_sesion: string;
  isLogin: boolean;
  userId: string|null;
  @ViewChild('modal_sesion') modal_sesion: ElementRef;

  constructor( 
    private _auth: AuthService,
    private _com: ComunicationService,
    private _router: Router,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.isUserLogin();
    this._com.getDataId().subscribe( value => {
      if(value){
        this.isLogin = true;
        this.userId = value
      } else{
        this.isLogin = false;
        this.userId = null;
      }
    })
  };

  isUserLogin(){
      if (this._auth.getUserDetails() != null) {
        this.isLogin = true;
      }
  }

  open(){
    this._com.setMenuOffCanvas();
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
