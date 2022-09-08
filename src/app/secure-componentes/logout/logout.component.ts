import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( 
    private _auth: AuthService, 
    private _router: Router,
    private _com: ComunicationService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.logout()
    }, 1500);
    
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['login']);
    this._com.setDataId(null);
  }

}
