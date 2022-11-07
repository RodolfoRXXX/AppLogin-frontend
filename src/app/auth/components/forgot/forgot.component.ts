import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  user_email:string;
  estado_proceso:string;

  constructor(
    private _router: Router
  ) {
    this.estado_proceso = 'enviar';
    this.user_email = '';
  }

  ngOnInit(): void {
    
  }

  actualizar_proceso(e:any){
    switch (e) {
      case 'inicio':
        this.estado_proceso = 'enviar';
        break;
      case 'enviado':
        this.estado_proceso = 'verificar';
        break;
      case 'verificado':
        this.estado_proceso = 'actualizar';
        break;
      case 'actualizado':
        this._router.navigate(['login']);
        break;
    }
  }

  guardar_email(email:any){
    this.user_email = email;
  }

}
