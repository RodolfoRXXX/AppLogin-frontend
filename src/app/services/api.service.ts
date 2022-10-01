import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.URL;

  constructor( private _http: HttpClient ) { }

  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/json'
    })
  }; */

  /*getTypeRequest(url:any){
    return this._http.get(`${this.baseUrl}${url}`).pipe(
      map( res => {
        return res;
      })
    )
  }*/

  getTypeRequest(url:any){
    return this._http.get(`${this.baseUrl}${url}`).pipe(
      catchError(this.handleError)
    );
  }

  postTypeRequest(url:any, payload:any){
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(
      catchError(this.handleError)
    )
  }

  putTypeRequest(url:any, payload:any){
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(
      catchError(this.handleError)
    )
  }

  //Manejo de errores
  private handleError( error: HttpErrorResponse ){
    if( error.error instanceof ErrorEvent ){
      //error del lado cliente
      console.error('Ocurrió un error', error.error.message);
    } else{
      //error del lado servidor
      console.error(`El backend retornó el código de error ${error.status}. El cuerpo del mensaje de error es ${error.message}`);
    }
    return throwError(() => new Error('Algo malo sucedió. por favor intenta más tarde.'));
  }

}