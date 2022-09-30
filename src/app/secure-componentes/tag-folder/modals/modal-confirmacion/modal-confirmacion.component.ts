import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  //evento de cierre de modal y guardar valores elegidos
  @Output() cerrado: EventEmitter<any>;

  constructor() { 
    this.cerrado = new EventEmitter();
   }

  ngOnInit(): void {
  }

  cerrar( value:string ){
      this.cerrado.emit(value);
  }

}
