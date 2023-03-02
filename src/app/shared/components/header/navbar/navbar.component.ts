import { Component, OnInit } from '@angular/core';
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

  hidden = false;

  constructor( 
    //private _auth: AuthService,
    //private _com: ComunicationService
  ) {
    this.isLogin = false;
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
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
