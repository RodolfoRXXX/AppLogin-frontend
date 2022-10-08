import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { array_especies } from 'src/app/entidades/array_especies';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent implements OnInit {

  @Input() form: FormGroup;
  especies: string[];

  constructor() { 
    this.especies = array_especies;
   }

  ngOnInit(): void {
  }

}
