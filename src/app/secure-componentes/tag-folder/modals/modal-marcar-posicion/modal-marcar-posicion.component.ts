import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-marcar-posicion',
  templateUrl: './modal-marcar-posicion.component.html',
  styleUrls: ['./modal-marcar-posicion.component.css']
})
export class ModalMarcarPosicionComponent implements OnInit {

  //evento de cierre de modal y guardar valores elegidos
  @Output() cerrado: EventEmitter<any>;

  state:boolean;

  constructor() {
    this.cerrado = new EventEmitter();
    this.state = true;
  }

  ngOnInit(): void {
  }

  cerrar( value:boolean ){
    this.state = false;
    this.cerrado.emit(value);
}

}
