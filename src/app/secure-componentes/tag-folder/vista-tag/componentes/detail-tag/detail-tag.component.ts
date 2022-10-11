import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-tag',
  templateUrl: './detail-tag.component.html',
  styleUrls: ['./detail-tag.component.css']
})
export class DetailTagComponent implements OnInit {

  @Input() tipo:string;
  @Input() dato:any;

  constructor() { }

  ngOnInit(): void {
  }

}
