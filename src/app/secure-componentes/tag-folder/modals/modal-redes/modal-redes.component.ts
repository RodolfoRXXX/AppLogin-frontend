import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { array_social, social } from 'src/app/entidades/array_social';
import { social_data } from 'src/app/entidades/social_form';

@Component({
  selector: 'app-modal-redes',
  templateUrl: './modal-redes.component.html',
  styleUrls: ['./modal-redes.component.css']
})
export class ModalRedesComponent implements OnInit {

  //elementos del array de redes y variables para guardar los valores de cada red elegida
  redes: social[];
  red_nombre: string;
  red_placeholder: string;
  red_formato: string;

  //referencias del elemento input
  @ViewChild('val_input') val_input: ElementRef;
  input: string;

  //objeto formato de la respuesta enviada de acuerdo a los valores ingresados
  social: social_data;

  //evento de cierre de modal y guardar valores elegidos
  @Output() cerrado: EventEmitter<any>;
  
  //datos del usuario y redes ya usadas
  @Input() data_user: any;

  constructor() { 
    this.social = { id_red: -1, user: '', link: ''  };
    this.cerrado = new EventEmitter();
    this.redes = array_social;
    this.input = '';
   }

  ngOnInit(): void { 
    this.completarModal();
  }

  //Completa con valor existente
  completarModal(){
    if(this.data_user.valor){
      this.social.link = this.data_user.valor.link;
      this.input = this.data_user.valor.user;
      this.social.id_red = this.data_user.valor.id_red;
      let f = this.redes[this.social.id_red];
      (f)?(this.red_nombre = f.nombre)&&(this.red_placeholder = f.texto)&&(this.red_formato = f.formato):'';
    }
  }

  //Selecciona la red elegida en el modal de redes
  seleccionarRed(e:any){
    if(this.data_user.valor?.id_red == e){
      this.completarModal();
    }
    if(this.social.id_red != e){
      this.input = '';
      this.social.id_red = e;
      let f = this.redes[this.social.id_red];
      (f)?(this.red_nombre = f.nombre)&&(this.red_placeholder = f.texto)&&(this.red_formato = f.formato):'';
    }
  }

  //crea el vínculo con el cambio del input
  crearVinculo(e:any){
    let texto = '';
    texto = this.red_formato + e.target.value;
    this.social.link = texto;
    this.social.user = e.target.value;
    console.log(this.social.link)
  }

  cerrar(e:any){
    if(e == 'ok'){
      this.cerrado.emit(this.social);
    } else{
      this.cerrado.emit();
    }
    
  }

  comprobar(i:any){
    if( this.data_user.valor?.id_red != i ){
      if(this.data_user.usados){
        let f = this.data_user.usados.find( (element:any) => element.id_red == i );
        if(f){
          return true;
        }
      }
    }
    return false;
  }

}
