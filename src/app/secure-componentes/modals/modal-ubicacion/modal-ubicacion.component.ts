import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-ubicacion',
  templateUrl: './modal-ubicacion.component.html',
  styleUrls: ['./modal-ubicacion.component.css']
})
export class ModalUbicacionComponent implements OnInit {


  @Input() found_tags:any;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.found_tags)
  }

  cerrar(){
    this.modalService.dismissAll();
  }

}
