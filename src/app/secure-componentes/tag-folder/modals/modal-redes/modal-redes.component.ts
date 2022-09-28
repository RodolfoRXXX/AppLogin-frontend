import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { array_social, social } from 'src/app/entidades/array_social';

@Component({
  selector: 'app-modal-redes',
  templateUrl: './modal-redes.component.html',
  styleUrls: ['./modal-redes.component.css']
})
export class ModalRedesComponent implements OnInit {

  redes: social[] = array_social;
  redSeleccionado: number;
  redTexto: string = '';
  redDetalle: string = '';
  redFormato: string = '';

  @Output() cerrado: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  //Selecciona la red elegida en el modal de redes
  seleccionarRed(e:any){
    this.redSeleccionado = e.target.name;
    let f = this.redes.find( element => element.id == this.redSeleccionado );
    (f)?(this.redTexto = f.nombre)&&(this.redDetalle = f.texto)&&(this.redFormato = f.formato):'';
  }

  crearVinculo(e:any){
    let texto = '';
    texto = this.redFormato + e.target.value;
    console.log(texto);
  }

  cerrar(e?:any){
    this.cerrado.emit(true);
    console.log(e)
  }

}
