import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getToken()) {
      return true;
    }

    //navegar hasta la página de login
    this._router.navigate(['login']);
    //Aquí se puede guardar la url donde se intentó acceder sin autorización
    //para luego del login, redireccionar
    return false;
  }

}
