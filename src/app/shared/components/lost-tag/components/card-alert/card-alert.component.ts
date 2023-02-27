import { Component, Input, OnInit } from '@angular/core';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-alert',
  templateUrl: './card-alert.component.html',
  styleUrls: ['./card-alert.component.css']
})
export class CardAlertComponent implements OnInit {

  @Input() persona:Persona;
  @Input() mascota:mascota;
  @Input() vehiculo:Vehiculo;
  @Input() tipo:string;
  foto_perfil:string;
  titulo:string;
  texto:string;
  telefono:string;
  link_tel:string;
  wsp:string;
  link_wsp:string;
  fecha:string;

  estado:string;

  constructor() {
    this.estado = 'load';
  }

  ngOnInit(): void {
    if((this.tipo)&&((this.persona)||(this.mascota)||(this.vehiculo))){
      this.crear_card();
      this.estado = 'ok';
    }  
  }

  crear_card(){
    switch (this.tipo) {
      case 'personas':
        this.foto_perfil = environment.SERVER + this.persona.foto;
        this.titulo = this.persona.nombre + ' ' + this.persona.apellido;
        this.texto = this.persona.obsestado;
        this.telefono = this.persona.telresp;
        (this.telefono != '')?(this.link_tel = 'tel:+' + this.telefono):'';
        this.wsp = this.persona.wspresp;
        (this.wsp != '')?(this.link_wsp = 'https://wa.me/549' + this.wsp):'';
        this.fecha = this.persona.fechaestado;
        break;
      case 'mascotas':
        this.foto_perfil = environment.SERVER + this.mascota.foto;
        this.titulo = this.mascota.especie + ' - ' + this.mascota.nombre;
        this.texto = this.mascota.obsestado;
        this.telefono = this.mascota.telresp;
        (this.telefono != '')?(this.link_tel = 'tel:+' + this.telefono):'';
        this.wsp = this.mascota.wspresp;
        (this.wsp != '')?(this.link_wsp = 'https://wa.me/549' + this.wsp):'';
        this.fecha = this.mascota.fechaestado;
        break;
      case 'vehiculos':
        this.foto_perfil = environment.SERVER + this.vehiculo.foto;
        this.titulo = this.vehiculo.marca + ' - ' + this.vehiculo.modelo;
        this.texto = this.vehiculo.obsestado;
        this.telefono = this.vehiculo.telresp;
        (this.telefono != '')?(this.link_tel = 'tel:+' + this.telefono):'';
        this.wsp = this.vehiculo.wspresp;
        (this.wsp != '')?(this.link_wsp = 'https://wa.me/549' + this.wsp):'';
        this.fecha = this.vehiculo.fechaestado;
        break;
      default:
        //error
        this.estado = 'error';
        break;
    }
  }

}
