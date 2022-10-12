import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-sesion',
  templateUrl: './modal-sesion.component.html',
  styleUrls: ['./modal-sesion.component.css']
})
export class ModalSesionComponent implements OnInit {

  //evento de cierre de modal y guardar valores elegidos
  @Output() cerrado: EventEmitter<any>;

  //texto que va a mostrar el modal
  @Input() texto: any;

  constructor() { 
    this.cerrado = new EventEmitter();
   }

  ngOnInit(): void {
  }

  cerrar( value:boolean ){
      this.cerrado.emit(value);
  }

}
