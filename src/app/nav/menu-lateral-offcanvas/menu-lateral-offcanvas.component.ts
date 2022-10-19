import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private offcanvasService: NgbOffcanvas,
    private _com: ComunicationService,
    private _auth: AuthService
  ) {
    this.user = '';
  }

  ngOnInit(): void {
    this.getUser();
    this._com.getMenuOffCanvas().subscribe( value => {
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
      (data)?(this.user = JSON.parse(data)[0].email):'';
    }
  }

}