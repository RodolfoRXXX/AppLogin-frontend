import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-box',
  templateUrl: './data-box.component.html',
  styleUrls: ['./data-box.component.css']
})
export class DataBoxComponent implements OnInit {

  @Input() dato:any;

  info: boolean;

  constructor() {
    this.info = false;
  }

  ngOnInit(): void {
  }

  abrir(){
    this.info = true;
  }

  cerrar(){
    this.info = false;
  }

}
