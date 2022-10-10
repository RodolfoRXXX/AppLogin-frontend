import { Component, Input, OnInit } from '@angular/core';
import { array_social, social } from 'src/app/entidades/array_social';
import { social_data } from 'src/app/entidades/social_form';

@Component({
  selector: 'app-vista-tag',
  templateUrl: './vista-tag.component.html',
  styleUrls: ['./vista-tag.component.css']
})
export class VistaTagComponent implements OnInit {

  /*
  amarillo: #fcca46
  verde: #28b463
  rojo: #cb4335
  */

  @Input() datos:any;
  @Input() tipo:string;
  URL: string = 'http://localhost:4000/uploads/';

  redes: social[];
  sociales: social_data[];
  usuario:string;
  leaf_selected:string;
  foto_perfil:string;

  constructor() { 
    this.leaf_selected = 'data';
    this.foto_perfil = '../../../../assets/img/blanck_persona.png';
    this.usuario = '';
    this.redes = array_social;
    this.sociales = [];
  }

  ngOnInit(): void {
    console.log(this.datos)
    switch (this.tipo) {
      case 'persona' :
        (this.datos.foto != '')?(this.foto_perfil = this.URL + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_persona.png'); 
        this.usuario = this.datos.nombre + ' ' + this.datos.apellido;
        this.sociales = (this.datos.red != '')?JSON.parse(this.datos.red):[];
    
        break;
      case 'mascota' :
        (this.datos.foto != '')?(this.foto_perfil = this.URL + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_mascota.png');
        this.usuario = this.datos.nombre;


        break;
      case 'vehiculo' :
        (this.datos.foto != '')?(this.foto_perfil = this.URL + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_vehiculo.png');
        this.usuario = this.datos.marca + ' ' + this.datos.modelo;


        break;
      default:
        //Error!!!

        break;
    }
  }

  select_leaf(text:string){
    this.leaf_selected = text;
  }

}
