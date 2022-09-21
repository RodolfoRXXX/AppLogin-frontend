import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  navActive:number = 1;
  form: FormGroup;
  activeTipo: boolean = true;
  activeOthers: boolean = false;
  tagChoosen:string = 'persona';
  tag:any = { tipo:null, id:null };
  @ViewChild('selectTipo') selectTipo: ElementRef;

  constructor(
    private _com: ComunicationService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._com.setTabEditor('Creando Tag');
    this._activatedRoute.params.subscribe( (params: Params) => {
      this.tag.tipo = params['tipo'];
      this.tag.id   = params['id'];
      if(params['tipo'] === 'personal'){
            //bloquea la pestaña tipo y deja activa la segunda "datos", guarda el tipo "persona" en una variable del formulario
        if (params['id'] != '0') {
          //1) busca el registro de ese id en la tabla personas 
          //2) carga el formulario personas con el registro encontrado y lo pasa como parámetro para que complete el formulario 
        } else {
          //1) carga el formulario personas vacío, pero se empieza a ver desde la solapa "datos", este tag será personal
        }
      } else{ //aquí el "tipo" es el tipo de tag, que será diferente a "personal" pudiendo ser persona/mascota/vehiculo
        if (params['id'] != '0') {
          //1) busca el registro de ese id en la tabla pasada como "tipo"
          //2) carga el formulario personas con el registro encontrado y lo pasa como parámetro para que complete el formulario
          //3) coloca en el select el valor del "tipo" así se desbloquean las demás solapas
        } else {
          //1) carga el formulario vacío para que el usuario pueda elegir el tipo de tag, que será un adicional
        }
      }

    } )
  }

  onTabClick(e:any){
    this.navActive = e.target.name;
  }

  onChange(e:any){
    this.tagChoosen = e.value;
    (e.value=='persona')?this.createFormPersona():'';
    (e.value=='mascota')?this.createFormMascota():'';
    (e.value=='vehiculo')?this.createFormVehiculo():'';
    this.activeOthers = true;
    this._com.setTabEditor('Creando Tag: ' + e.value);
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
