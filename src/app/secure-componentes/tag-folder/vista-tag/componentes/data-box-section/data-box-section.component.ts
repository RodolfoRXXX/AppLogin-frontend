import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-box-section',
  templateUrl: './data-box-section.component.html',
  styleUrls: ['./data-box-section.component.css']
})
export class DataBoxSectionComponent implements OnInit {

  @Input() contenido:any;

  constructor() { }

  ngOnInit(): void {
  }

}
