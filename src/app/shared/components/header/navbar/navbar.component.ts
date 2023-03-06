import { Component, OnInit } from '@angular/core';
import { ComunicationService } from 'src/app/shared/services/comunication.service';
//import { AuthService } from 'src/app/services/auth.service';
//import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  //userId: string|null;

  hidden_news = false;
  hidden_cart = false;

  constructor( 
    //private _auth: AuthService,
    private readonly comSvc: ComunicationService
  ) {
    this.isLogin = false;
  }

  deploy_news() {
    this.hidden_news = !this.hidden_news;
  }

  deploy_cart() {
    this.hidden_cart = !this.hidden_cart;
  }

  toggleMenu(): void {
    this.comSvc.setSidenav();
  }

  ngOnInit(): void {
    /*this.isUserLogin();
    this._com.getDataId().subscribe( value => {
      if(value){
        this.isLogin = true;
        this.userId = value
      } else{
        this.isLogin = false;
        this.userId = null;
      }
    })*/
  };

  isUserLogin(){
      /*if (this._auth.getUserDetails() != null) {
        this.isLogin = true;
      }*/
  }

  open(){
    //this._com.setMenuOffCanvas();
  }

}
