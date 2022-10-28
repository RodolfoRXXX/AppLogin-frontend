import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  texto_sesion: string;
  @ViewChild('modal_sesion') modal_sesion: ElementRef;

  constructor(
    private _router:Router,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  confirma_sesion(e:boolean){
    this.modalService.dismissAll();
      if(e){
        this._router.navigate(['logout']);
      }
  }

  cerrar_sesion(){
    this.texto_sesion = 'Estas por salir de la sesión';
      this.modalService.open(this.modal_sesion, { centered: true, size: 'sm' });
  }

}
