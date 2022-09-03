import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( 
    private _auth: AuthService, 
    private _router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.logout()
    }, 2000);
    
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['home']);
  }

}
