import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {

  userId: any;

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    let data = this._auth.getUserId();
    if(data){
      this.userId = (JSON.parse(data));
    }
    
  }


}
