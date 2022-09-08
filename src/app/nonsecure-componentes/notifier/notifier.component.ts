import { Component, OnInit } from '@angular/core';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  display: boolean = false;
  state: string;
  text: string;

  constructor(
    private _com: ComunicationService
  ) { }

  ngOnInit(): void {
    this._com.getNotifier().subscribe( (value:any) => {
      this.setNotifier( value.display, value.state, value.text );
    } )
  }

  setNotifier( display:boolean, state:string, text:string ){
    this.display = display;
    this.state = state;
    this.text = text;
    this.hideNotifier();
  }

  hideNotifier(){
    setTimeout(() => {
      this.display = false;
      this.state = '';
      this.text = '';
    }, 3500);
  }

}
