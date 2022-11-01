import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { icon } from "leaflet"
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-modal-ubicacion',
  templateUrl: './modal-ubicacion.component.html',
  styleUrls: ['./modal-ubicacion.component.css']
})
export class ModalUbicacionComponent implements OnInit {

  @Input() datos:any;
  latitud:any;
  longitud:any;
  texto_popup:string;

  constructor(private modalService: NgbModal) {
    this.latitud = -32.954592;
    this.longitud = -60.656022;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    var map = L.map('map').setView([this.latitud, this.longitud], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const myIcon = icon({
      iconUrl: "../../../../assets/img/gps-marker.png",
      iconSize: [48, 48],
    })

    this.datos.map( (point:any) => {
      L.marker([point.latitud, point.longitud], {icon: myIcon}).addTo(map).bindPopup(
        `<div class="d-flex flex-column align-items-center justify-content-center">
        <h5 class="text-center mb-0"><b>${point.titulo}</b></h5>
        <p class="d-block text-muted text-center mb-0">${point.obs}</p>
        <p class="d-block mb-0">Encontrado el ${point.fecha}</p>
        </div>`
      );
    })

    map.fitBounds([
      ...this.datos.map( (point:any) => [point.latitud, point.longitud] as [number, number])
    ])
    
  }

  cerrar(){
    this.modalService.dismissAll();
  }

}
