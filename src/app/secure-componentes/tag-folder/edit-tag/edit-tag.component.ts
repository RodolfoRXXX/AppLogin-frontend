import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ActivatedRoute, Params, Router, TitleStrategy } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { mascota, Persona, Vehiculo } from 'src/app/entidades/tag';
import { emailValidator } from '../../function/functions';
import { AuthService } from 'src/app/services/auth.service';
import { FileServicesService } from 'src/app/services/file-services.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { array_social, social } from 'src/app/entidades/array_social';
import { social_data } from 'src/app/entidades/social_form';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  userId: any;

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
  estado_foto: string = '';

  data_user:Object = {};
  redes: social[] = array_social;
  sociales: social_data[];

  red_input_seleccion: number|undefined;

  data_form: FormData = new FormData;

  @ViewChild('selectTipo') selectTipo: ElementRef;
  @ViewChild('modal_redes') modal_redes: ElementRef;
  @ViewChild('modal_confirmacion') modal_confirmacion: ElementRef;

  constructor(
    private _com: ComunicationService,
    private _activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private _auth: AuthService,
    private _fileservice: FileServicesService,
    private _router: Router,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
    this.sociales = [];
  }

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
                    this.createFormPersona(this.userId, 'personal', this.persona);
                    this._com.setTabEditor('Editando Tag-ID: ' + this.persona.nombre + ' ' + this.persona.apellido);
                    this.tipo_form = 'persona';
                    this.foto_formulario = this.persona.foto!=''?this.persona.foto:'../../../../assets/img/blanck_persona.png';
                    this.sociales = (this.persona.red != '')?JSON.parse(this.persona.red):[];
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

  //Abrir y cerrar modal redes
    open( content:any, social:any, red_input:number|undefined ) {
      this.red_input_seleccion = red_input;
      this.data_user = {
        valor: social,
        usados: this.sociales
      };
      this.modalService.open(content, { centered: true });
    }
    cerrar( e:any ){
      if(e){
        if(this.red_input_seleccion != undefined){
          this.sociales[this.red_input_seleccion] = e;
        } else{
          this.sociales.push(e);
        }
      }
        this.modalService.dismissAll();
        this.red_input_seleccion = undefined;
        console.log(this.sociales);
    }

  //maneja el modal de confirmacion de eliminación
    modal_confirmar( e:any, i:number ){
      e.stopPropagation();
      this.modalService.open(this.modal_confirmacion, { centered: true, size: 'sm' });
    }
    cerrar_confirma( e:any ){
      this.modalService.dismissAll();
      console.log(e);
    }

  capturaFile(event:any):any{
    const archivoCapturado = event.target.files[0];
    if ((archivoCapturado.type == 'image/jpg') || (archivoCapturado.type == 'image/jpeg') || (archivoCapturado.type == 'image/png')){
      if (archivoCapturado.size < 10485760) {
        this._fileservice.extraerBase64(archivoCapturado).then( (imagen:any) => {
          console.log(imagen);
          this.foto_formulario = imagen.base;
          this.estado_foto = 'ok';
          this.data_form.append('foto', imagen.base);
        });
      } else{
        //error de peso mayor
        this.estado_foto = 'peso';
      }
    } else{
      //error de formato
      this.estado_foto = 'formato';
    }
  }

  onSubmit(){
    this.data_form.append('data', JSON.stringify(this.form.value));
    console.log(this.data_form.get('data'));
    console.log(this.data_form.get('foto'));
  }

  cancelForm(){
    this._router.navigate(['profile/tags/all-tag']);
  }

  createFormPersona(userId:number, nivel:string, data?:Persona){
    this.form = new FormGroup({
      nombre: new FormControl((data)?data.nombre:'',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ),
      apellido: new FormControl((data)?data.apellido:'',
      [
        Validators.required,
        Validators.minLength(3),
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
        Validators.maxLength(50)
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
        Validators.maxLength(30)
      ]
    ),
      observaciones: new FormControl((data)?data.observaciones:'',
      [
        Validators.minLength(5),
        Validators.maxLength(255)
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
        Validators.minLength(7),
        Validators.maxLength(13)
      ]
    ),
      wspresp: new FormControl((data)?data.wspresp:'',
      [
        Validators.minLength(7),
        Validators.maxLength(13)
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
