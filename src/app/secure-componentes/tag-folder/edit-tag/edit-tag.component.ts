import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { emailValidator } from '../../function/functions';
import { AuthService } from 'src/app/services/auth.service';
import { FileServicesService } from 'src/app/services/file-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  userId: any;

  archivos: any = [];
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
    private _api: ApiService,
    private _auth: AuthService,
    private _fileservice: FileServicesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    let data = this._auth.getUserId();
    if(data){
      this.userId = (JSON.parse(data));
    }
    this.load_form = true;
    this._activatedRoute.params.subscribe( (params: Params) => {
      this.tag.tipo = params['tipo'];
      this.tag.id   = params['id'];
      if(parseInt(params['id']) == 0){
        //Creando
        switch (params['tipo']) {
          case 'personal':
            this.createFormPersona(this.userId, 'personal');
            this._com.setTabEditor('Creando Tag-ID: Personal');
            this.tipo_form = 'persona';
            this.foto_formulario = '../../../../assets/img/blanck_persona.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'persona':
            this.createFormPersona(this.userId, 'adicional');
            this._com.setTabEditor('Creando Tag-ID: Persona');
            this.tipo_form = 'persona';
            this.foto_formulario = '../../../../assets/img/blanck_persona.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'mascota':
            this.createFormMascota(this.userId, 'adicional');
            this._com.setTabEditor('Creando Tag-ID: Mascota');
            this.tipo_form = 'mascota';
            this.foto_formulario = '../../../../assets/img/blanck_mascota.png'
            this.load_form = false;
            this.show_form = true;
            this.activeTabs = true;
            break;
          case 'vehiculo':
            this.createFormVehiculo(this.userId, 'adicional');
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
                    this.createFormPersona(this.userId, 'personal', this.persona);
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
                    this.createFormMascota(this.userId, 'adicional', this.mascota);
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
                    this.createFormVehiculo(this.userId, 'adicional', this.vehiculo);
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

  extraerBase64 = async ($event: any) => new Promise((res, rej) => {
    try {
      const unSafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unSafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        res({
          blob: $event,
          image,
          base: reader.result
        })
      };
      reader.onerror = error => {
        res({
          blob: $event,
          image,
          base: null
        })
      };
    } catch (error) {
        return null;
    }
  })

  capturaFile(event:any):any{
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then( (imagen:any) => {
      console.log(imagen);
      this.foto_formulario = imagen.base;
    } )
    //this.archivos.push(archivoCapturado);
    //console.log(event.target.files[0])
  }

  onSubmit(){
    console.log(this.form.value);
  }

  createFormPersona(userId:number, nivel:string, data?:Persona){
    this.form = new FormGroup({
      foto: new FormControl((data)?data.foto:'',
      [
        Validators.maxLength(255)
      ]
    ),
      nombre: new FormControl((data)?data.nombre:'',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ),
      apellido: new FormControl((data)?data.apellido:'',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      ciudad: new FormControl((data)?data.ciudad:'',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      direccion: new FormControl((data)?data.direccion:'',
      [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      email: new FormControl((data)?data.email:'',
      [
        emailValidator()
      ]
    ),
      fechanac: new FormControl((data)?data.fechanac:''),
      nacionalidad: new FormControl((data)?data.nacionalidad:'',
      [
        Validators.minLength(4),
        Validators.maxLength(20),
        emailValidator()
      ]
    ),
      observaciones: new FormControl((data)?data.observaciones:'',
      [
        Validators.maxLength(500)
      ]
    ),
      nombreresp: new FormControl((data)?data.nombreresp:'',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      telresp: new FormControl((data)?data.telresp:'',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]
    ),
      wspresp: new FormControl((data)?data.wspresp:'',
      [
        Validators.minLength(8),
        Validators.maxLength(12)
      ]
    ),
      id_autor: new FormControl((data)?data.id_autor:userId,
      [
        Validators.required
      ]
    ),
      nivel: new FormControl((data)?data.nivel:nivel,
      [
        Validators.required
      ]
    ),
      tabla: new FormControl('personas')
    })
  }

  createFormMascota(userId:number, nivel:string, data?:mascota){
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
      id_autor: new FormControl((data)?data.id_autor:userId),
      nivel: new FormControl((data)?data.nivel:nivel),
      tabla: new FormControl('mascotas')
    })
  }

  createFormVehiculo(userId:number, nivel:string, data?:Vehiculo){
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
      id_autor: new FormControl((data)?data.id_autor:userId),
      nivel: new FormControl((data)?data.nivel:nivel),
      tabla: new FormControl('vehiculos')
    })
  }

}
