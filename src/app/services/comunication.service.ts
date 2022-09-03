import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

subjectLogin: Subject<string> = new Subject();
login: boolean = false;


  constructor() {
    
  }

  comunicarLogin(){

  }


}
