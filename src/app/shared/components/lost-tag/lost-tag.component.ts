import { Component, OnInit } from '@angular/core';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lost-tag',
  templateUrl: './lost-tag.component.html',
  styleUrls: ['./lost-tag.component.css']
})
export class LostTagComponent implements OnInit {

  data_personas:Persona[];
  data_mascotas:mascota[];
  data_vehiculos:Vehiculo[];

  personas:Persona[];
  mascotas:mascota[];
  vehiculos:Vehiculo[];

  card_show:string;

  page:number;
  tipo:string;
  length_data:number;

  constructor(
    private _api:ApiService
  ) {
    this.card_show = 'load';
    this.data_personas = [];
    this.data_mascotas = [];
    this.data_vehiculos = [];
    this.personas = [];
    this.mascotas = [];
    this.vehiculos = [];
    this.length_data = 0;
    this.tipo = 'todos';
    this.page = 1;
  }

  ngOnInit(): void {
    this.carga_datos();
  }

  carga_datos(){
    this._api.getTypeRequest('user/get-lost-tag').subscribe({
      next: (res: any) => {
        if(res.status == 1){
          this.data_personas = res.data.personas;
          this.data_mascotas = res.data.mascotas;
          this.data_vehiculos = res.data.vehiculos;
          if((res.data.personas.length + res.data.mascotas.length + res.data.vehiculos.length) > 0){
            this.completar_vista(res.data.personas, res.data.mascotas, res.data.vehiculos);
          } else{
            this.card_show = 'empty';
          }
        } else{
          console.log(res.error)
          this.card_show = 'error';
        }
      },
      error: (error) => {
          //ventana de error
          console.warn(error)
          this.card_show = 'error';
      }
    });
  }

  completar_vista(var_personas:Persona[], var_mascotas:mascota[], var_vehiculos:Vehiculo[]){
    switch (this.tipo) {
      case 'todos':
        this.length_data = var_personas.length + var_mascotas.length + var_vehiculos.length;
        //toma los tres arrays y filtra cantidades definidas de cada uno y el número de página
            for (let i = ((this.page - 1)*3); i < (this.page*3 && var_personas.length); i++) {
              this.personas.push(var_personas[i])
            };
            for (let i = ((this.page - 1)*4); i < (this.page*4 && var_mascotas.length); i++) {
              this.mascotas.push(var_mascotas[i])
            };
            for (let i = ((this.page - 1)*3); i < (this.page*3 && var_vehiculos.length); i++) {
              this.vehiculos.push(var_vehiculos[i])
            };
        break;
      case 'personas':
        this.length_data = var_personas.length;
        //toma solo array personas y filtra cierta cantidades coincidentes con el número de página
          for (let i = ((this.page - 1)*10); i < (this.page*10 && var_personas.length); i++) {
            this.personas.push(var_personas[i])
          }
        break;
      case 'mascotas':
        this.length_data = var_mascotas.length;
        //toma solo array mascotas y filtra cierta cantidades coincidentes con el número de página
          for (let i = ((this.page - 1)*10); i < (this.page*10 && var_mascotas.length); i++) {
            this.mascotas.push(var_mascotas[i])
          }
        break;
      case 'vehiculos':
        this.length_data = var_vehiculos.length;
        //toma solo array vehiculos y filtra cierta cantidades coincidentes con el número de página
          for (let i = ((this.page - 1)*10); i < (this.page*10 && var_vehiculos.length); i++) {
            this.vehiculos.push(var_vehiculos[i])
          }
        break;
    }
    this.card_show = 'ok';
  }

  filtro( e:any ){
    this.tipo = e.target.value;
    this.personas = [];
    this.mascotas = [];
    this.vehiculos = [];
    this.completar_vista(this.data_personas, this.data_mascotas, this.data_vehiculos);
  }

  change_page(){
    this.personas = [];
    this.mascotas = [];
    this.vehiculos = [];
    this.completar_vista(this.data_personas, this.data_mascotas, this.data_vehiculos);
  }

}
