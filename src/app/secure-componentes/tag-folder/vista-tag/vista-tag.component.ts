import { Component, Input, OnInit } from '@angular/core';
import { array_social, social } from 'src/app/entidades/array_social';
import { globalVariable } from 'src/app/entidades/global_variables';
import { social_data } from 'src/app/entidades/social_form';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-tag',
  templateUrl: './vista-tag.component.html',
  styleUrls: ['./vista-tag.component.css']
})
export class VistaTagComponent implements OnInit {

  link = globalVariable.LINK;
  nolink = globalVariable.NOLINK;
  alert = globalVariable.ALERT;

  @Input() datos:any;
  @Input() tipo:string;

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
    switch (this.tipo) {
      case 'persona' :
        (this.datos.foto != '')?(this.foto_perfil = environment.SERVER + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_persona.png'); 
        this.usuario = this.datos.nombre + ' ' + this.datos.apellido;
        this.sociales = (this.datos.red != '')?JSON.parse(this.datos.red):[];
    
        break;
      case 'mascota' :
        (this.datos.foto != '')?(this.foto_perfil = environment.SERVER + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_mascota.png');
        this.usuario = this.datos.nombre;


        break;
      case 'vehiculo' :
        (this.datos.foto != '')?(this.foto_perfil = environment.SERVER + this.datos.foto):(this.foto_perfil = '../../../../assets/img/blanck_vehiculo.png');
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
