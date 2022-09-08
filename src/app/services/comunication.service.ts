import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  dataIdObservable: Subject<string|null> = new Subject();
  notifierObservable: Subject<any> = new Subject();

  constructor() { }

  //Observable para cambios en el id del usuario
  setDataId( id:string|null ){
    this.dataIdObservable.next(id);
  }
  getDataId(){
    return this.dataIdObservable.asObservable();
  }

  //Observable para llamar a una notificación
  setNotifier( value: any ){
    this.notifierObservable.next(value);
  }
  getNotifier(){
    return this.notifierObservable.asObservable();
  }


}
