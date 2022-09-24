import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  load_form: boolean = false;
  show_form: boolean = false;
  error_form: boolean = false;
  tipo_form: string = 'persona';
  navActive:number = 1;
  form: FormGroup;
  activeTabs: boolean = false;
  tag:any = { tipo:null, id:null };
  persona: Persona;
  mascota: mascota;
  vehiculo: Vehiculo;
  foto_formulario: string;
  @ViewChild('selectTipo') selectTipo: ElementRef;

  constructor(
    private _com: ComunicationService,
    private _activatedRoute: ActivatedRoute,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.load_form = true;
    this._activatedRoute.params.subscribe( (params: Params) => {
      this.tag.tipo = params['tipo'];
      this.tag.id   = params['id'];
      if(parseInt(params['id']) == 0){
        //Creando
        switch (params['tipo']) {
          case 'personal':
            this.createFormPersona();
            this._com.setTabEditor('Creando Tag-ID: Personal');
            this.tipo_form = 'persona';
            this.foto_formulario = '../../../../assets/img/blanck_persona.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'persona':
            this.createFormPersona();
            this._com.setTabEditor('Creando Tag-ID: Persona');
            this.tipo_form = 'persona';
            this.foto_formulario = '../../../../assets/img/blanck_persona.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'mascota':
            this.createFormMascota();
            this._com.setTabEditor('Creando Tag-ID: Mascota');
            this.tipo_form = 'mascota';
            this.foto_formulario = '../../../../assets/img/blanck_mascota.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'vehiculo':
            this.createFormVehiculo();
            this._com.setTabEditor('Creando Tag-ID: Vehiculo');
            this.tipo_form = 'vehiculo';
            this.foto_formulario = '../../../../assets/img/blanck_vehiculo.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          default:
            this.load_form = false;
            this.error_form = true;
            this.activeTabs = false;
            break;
        }
      } else if(parseInt(params['id']) > 0){
        //editando
        switch (params['tipo']) {
          case 'persona':
            this._api.postTypeRequest('profile/getTag', {id:params['id'], tabla:"personas"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.persona = res.data[0];
                    console.log(this.persona);
                    this.createFormPersona(this.persona);
                    this._com.setTabEditor('Editando Tag-ID: ' + this.persona.nombre + ' ' + this.persona.apellido);
                    this.tipo_form = 'persona';
                    this.foto_formulario = this.persona.foto!=''?this.persona.foto:'../../../../assets/img/blanck_persona.png';
                    this.load_form = false;
                    this.show_form = true;
                    this.activeTabs = true;
                  } else{
                    //no encontró el tag del id
                    this.load_form = false;
                    this.error_form = true;
                    this.activeTabs = false;
                  }  
                } else{
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
                }
              },
              error: (error) => {
                console.warn(error);
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
              },
              complete: () => {
              }
            });
            break;
          case 'mascota':
            this._api.postTypeRequest('profile/getTag', {id:params['id'], tabla:"mascotas"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.mascota = res.data[0];
                    console.log(this.mascota);
                    this.createFormMascota(this.mascota);
                    this._com.setTabEditor('Editando Tag-ID: ' + this.mascota.nombre + ' - ' + this.mascota.especie);
                    this.tipo_form = 'mascota';
                    this.foto_formulario = this.mascota.foto!=''?this.mascota.foto:'../../../../assets/img/blanck_mascota.png';
                    this.load_form = false;
                    this.show_form = true;
                    this.activeTabs = true;
                  } else{
                    //no encontró el tag del id
                    this.load_form = false;
                    this.error_form = true;
                    this.activeTabs = false;
                  }  
                } else{
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
                }
              },
              error: (error) => {
                console.warn(error);
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
              },
              complete: () => {
              }
            });
            break;
          case 'vehiculo':
            this._api.postTypeRequest('profile/getTag', {id:params['id'], tabla:"vehiculos"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.vehiculo = res.data[0];
                    console.log(this.vehiculo);
                    this.createFormVehiculo(this.vehiculo);
                    this._com.setTabEditor('Editando Tag-ID: ' + this.vehiculo.marca + ' - ' + this.vehiculo.modelo);
                    this.tipo_form = 'vehiculo';
                    this.foto_formulario = this.vehiculo.foto!=''?this.vehiculo.foto:'../../../../assets/img/blanck_vehiculo.png';
                    this.load_form = false;
                    this.show_form = true;
                    this.activeTabs = true;
                  } else{
                    //no encontró el tag del id
                    this.load_form = false;
                    this.error_form = true;
                    this.activeTabs = false;
                  }  
                } else{
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
                }
              },
              error: (error) => {
                console.warn(error);
                  //ventana de error
                  this.load_form = false;
                  this.error_form = true;
                  this.activeTabs = false;
              },
              complete: () => {
              }
            });
            break;
          default:
            //vuelve atrás
            break;
        }
      } else{
        //error
        this.load_form = false;
        this.error_form = true;
        this.activeTabs = false;
      }
    } )
  }

  onTabClick(e:any){
    this.navActive = e.target.name;
  }

  onChange(e:any){
    
  }

  onSubmit(){
    console.log(this.form.value);
  }

  createFormPersona(data?:Persona){
    this.form = new FormGroup({
      foto: new FormControl((data)?data.foto:''),
      nombre: new FormControl((data)?data.nombre:''),
      apellido: new FormControl((data)?data.apellido:''),
      ciudad: new FormControl((data)?data.ciudad:''),
      direccion: new FormControl((data)?data.direccion:''),
      email: new FormControl((data)?data.email:''),
      fechanac: new FormControl((data)?data.fechanac:''),
      nacionalidad: new FormControl((data)?data.nacionalidad:''),
      observaciones: new FormControl((data)?data.observaciones:''),
      nombreresp: new FormControl((data)?data.nombreresp:''),
      telresp: new FormControl((data)?data.telresp:''),
      wspresp: new FormControl((data)?data.wspresp:''),
      id_autor: new FormControl((data)?data.id_autor:''),
      nivel: new FormControl((data)?data.nivel:''),
      tabla: new FormControl('personas')
    })
  }

  createFormMascota(data?:mascota){
    this.form = new FormGroup({
      foto: new FormControl((data)?data.foto:''),
      nombre: new FormControl((data)?data.nombre:''),
      especie: new FormControl((data)?data.especie:''),
      ciudad: new FormControl((data)?data.ciudad:''),
      direccion: new FormControl((data)?data.direccion:''),
      fechanac: new FormControl((data)?data.fechanac:''),
      observaciones: new FormControl((data)?data.observaciones:''),
      nombreresp: new FormControl((data)?data.nombreresp:''),
      telresp: new FormControl((data)?data.telresp:''),
      wspresp: new FormControl((data)?data.wspresp:''),
      id_autor: new FormControl((data)?data.id_autor:''),
      nivel: new FormControl((data)?data.nivel:''),
      tabla: new FormControl('mascotas')
    })
  }

  createFormVehiculo(data?:Vehiculo){
    this.form = new FormGroup({
      foto: new FormControl((data)?data.foto:''),
      marca: new FormControl((data)?data.marca:''),
      modelo: new FormControl((data)?data.modelo:''),
      anio: new FormControl((data)?data.anio:''),
      color: new FormControl((data)?data.color:''),
      patente: new FormControl((data)?data.patente:''),
      ciudad: new FormControl((data)?data.ciudad:''),
      aseguradora: new FormControl((data)?data.aseguradora:''),
      nroseguro: new FormControl((data)?data.nroseguro:''),
      observaciones: new FormControl((data)?data.observaciones:''),
      nombreresp: new FormControl((data)?data.nombreresp:''),
      telresp: new FormControl((data)?data.telresp:''),
      wspresp: new FormControl((data)?data.wspresp:''),
      id_autor: new FormControl((data)?data.id_autor:''),
      nivel: new FormControl((data)?data.nivel:''),
      tabla: new FormControl('vehiculos')
    })
  }

}
