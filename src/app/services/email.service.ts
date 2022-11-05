import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private _api:ApiService
  ) {}

  bifurcador(tipo:string, _id_autor:any = null, _email:any = null, _password:any = null, _codigo:any = null){
    switch (tipo) {
      case 'register'://(RECIBO: email, código nuevo / BUSCO: - / ENVIO: codigo nuevo )
        this.enviar_mail(_email, tipo, {codigo:_codigo});
        break;
      case 'verificate'://(RECIBO: email, código actual / BUSCO: - / ENVIO: codigo actual )
        this.enviar_mail(_email, tipo, {codigo:_codigo});
        break;
      case 'marker'://(RECIBO: id / BUSCO: email / ENVIO: link a "Mi cuenta" )
        this.get_mail(_id_autor).subscribe({
          next: (value:any) => {
            this.enviar_mail(value, tipo, {web:'https://www.qrlink.com.ar/profile/tags/all-tag'});
          }
        });
        break;
      case 'change_pass'://(RECIBO: email / BUSCO: - / ENVIO: notificación )
        this.enviar_mail(_email, tipo, {});
        break;
      case 'change_mail'://(RECIBO: email, codigo nuevo / BUSCO: - / ENVIO: codigo nuevo )
        this.enviar_mail(_email, tipo, {codigo:_codigo});
        break;
      case 'change_user'://(RECIBO: email / BUSCO: - / ENVIO: notificación )
        this.enviar_mail(_email, tipo, {});
        break;
    }
  }

  enviar_mail(_email:string, _tipo:string, _data:any){
    this._api.postTypeRequest('user/envio-email', {email: _email, tipo:_tipo, data:_data}).subscribe();
  }

  public get_mail(_id_autor:any){
      return this._api.postTypeRequest('user/get-email', {_id_autor: _id_autor})
          .pipe(
            map( (res:any) => {
              return res.data[0].email;
            })
          )
  }

}
