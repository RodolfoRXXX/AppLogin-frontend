import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { array_colores } from 'src/app/entidades/array_colores';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.css']
})
export class VehiculoFormComponent implements OnInit {

  @Input() form: FormGroup;
  colores:string[];

  constructor() { 
    this.colores = array_colores;
  }

  ngOnInit(): void {
  }

}
