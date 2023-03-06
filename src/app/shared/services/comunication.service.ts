import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private openSidenav$ = new BehaviorSubject<boolean>(false);

  dataIdObservable: Subject<string|null> = new Subject();
  notifierObservable: Subject<any> = new Subject();
  menuOffcanvasObservable: Subject<any> = new Subject();
  tabEditorStateObservable: Subject<any> = new Subject();
  closeSessionObservable: Subject<any> = new Subject();

  constructor() { }

  //Controlador que maneja el sidenav
  get sidenav$():Observable<boolean> {
    return this.openSidenav$.asObservable();
  }
  setSidenav(): void {
      this.openSidenav$.next(!this.openSidenav$.value);
  }

  //Observable para cambios en el id del usuario
  setDataId( id:string|null ){
    this.dataIdObservable.next(id);
  }
  getDataId(){
    return this.dataIdObservable.asObservable();
  }

  //Observable para llamar a una notificación
  setNotifier( value:any ){
    this.notifierObservable.next(value);
  }
  getNotifier(){
    return this.notifierObservable.asObservable();
  }

  //Observable que llama al menú lateral en pantalla de teléfono móvil
  setMenuOffCanvas(){
    this.menuOffcanvasObservable.next("expand");
  }
  getMenuOffCanvas(){
    return this.menuOffcanvasObservable.asObservable();
  }

  //Observable que llama al menú lateral en pantalla de teléfono móvil
  setTabEditor( value:any ){
    this.tabEditorStateObservable.next(value);
  }
  getTabEditor(){
    return this.tabEditorStateObservable.asObservable();
  }

  //Observable que cierra sesión
  setCloseSession(){
    this.closeSessionObservable.next('');
  }
  getCloseSession(){
    return this.closeSessionObservable.asObservable();
  }

}
