import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificateGuardGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var data = this._auth.getUserDetails();
      if(data){
        data = JSON.parse(data)[0].active;
        console.log(data);
        if(data == '1'){
          return true;
        }
      }

      this._router.navigate(['verificate']);
      return false;
  }
  
}
