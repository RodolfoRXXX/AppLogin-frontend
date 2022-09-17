import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  active = 1;
  form: FormGroup;
  inactiveIndex: boolean = true;
  tagChoosen: string;

  constructor() { }

  ngOnInit(tag:any = 'persona'): void {
    (tag == 'persona')?this.createFormPersona:'';
    (tag == 'mascota')?this.createFormMascota:'';
    (tag == 'vehiculo')?this.createFormVehiculo:'';
    this.tagChoosen = tag.value;
    this.inactiveIndex = false;
  }

  onChange(tag:any){
    this.ngOnInit(tag);
  }

  onSubmit(){
    console.log(this.form.value);
  }

  createFormPersona(){
    this.form = new FormGroup({
      foto: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      ciudad: new FormControl(''),
      direccion: new FormControl(''),
      email: new FormControl(''),
      fechanac: new FormControl(''),
      nacionalidad: new FormControl(''),
      infoimportante: new FormControl(''),
      nombrecontacto: new FormControl(''),
      codarea: new FormControl(''),
      telcontacto: new FormControl(''),
      wspcontacto: new FormControl(''),
      id_autor: new FormControl(''),
      nivel: new FormControl('')
    })
  }

  createFormMascota(){
    this.form = new FormGroup({
      foto: new FormControl(''),
      nombre: new FormControl(''),
      especie: new FormControl(''),
      ciudad: new FormControl(''),
      direccion: new FormControl(''),
      detalle: new FormControl(''),
      fechanac: new FormControl(''),
      infoimportante: new FormControl(''),
      nombrecontacto: new FormControl(''),
      codarea: new FormControl(''),
      telcontacto: new FormControl(''),
      wspcontacto: new FormControl(''),
      id_autor: new FormControl(''),
      nivel: new FormControl('')
    })
  }

  createFormVehiculo(){
    this.form = new FormGroup({
      foto: new FormControl(''),
      marca: new FormControl(''),
      modelo: new FormControl(''),
      anio: new FormControl(''),
      color: new FormControl(''),
      patente: new FormControl(''),
      ciudad: new FormControl(''),
      aseguradora: new FormControl(''),
      nroseguro: new FormControl(''),
      infoimportante: new FormControl(''),
      nombrecontacto: new FormControl(''),
      codarea: new FormControl(''),
      telcontacto: new FormControl(''),
      wspcontacto: new FormControl(''),
      id_autor: new FormControl(''),
      nivel: new FormControl('')
    })
  }

}
