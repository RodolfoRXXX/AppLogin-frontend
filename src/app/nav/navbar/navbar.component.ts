import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;

  constructor( 
    private _auth: AuthService,
    private _com: ComunicationService
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this._com.getDataId().subscribe( value => {
      value?this.isLogin = true:this.isLogin = false;
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


}
