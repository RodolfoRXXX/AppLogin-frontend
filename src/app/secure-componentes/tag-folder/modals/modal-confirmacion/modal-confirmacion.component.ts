import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

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
