import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public protectedData: any;
  public loading: boolean;
  user: string;

  constructor(
    private _api: ApiService,
    private _auth: AuthService
  ) {
    this.loading = false;
    this.user = '';
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let data = this._auth.getUserDetails();
    if(data){
      (data)?(this.user = JSON.parse(data)[0].nombre):'';
    }
  }

}
