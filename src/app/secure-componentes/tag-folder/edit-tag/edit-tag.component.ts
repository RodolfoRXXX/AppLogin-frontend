import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  //Variables
    userId: any;

    estado_form: boolean;
    load_form: boolean;
    show_form: boolean;
    error_form: boolean;
    tipo_form: string;
    navActive:number;
    form: FormGroup;
    activeTabs: boolean;
    tag:any;
    persona: Persona;
    mascota: mascota;
    vehiculo: Vehiculo;

    foto_formulario: string;
    estado_foto: string;
    URL: string = 'http://localhost:4000/uploads/';
    foto_persona_blanck: string;
    foto_mascota_blanck: string;
    foto_vehiculo_blanck: string;

    texto_confirmacion: string;
    data_user:Object;
    redes: social[];
    sociales: social_data[];

    red_input_seleccion: number|undefined;
    red_delete_selection: number;

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

    this.estado_form = true;
    this.load_form = false;
    this.show_form = false;
    this.error_form = false;
    this.tipo_form = 'persona';
    this.navActive = 1;
    this.activeTabs = false;
    this.tag = { tipo:null, id:null };
    this.estado_foto = '';
    this.data_user = {};
    this.redes = array_social;
    this.sociales = [];
    this.foto_persona_blanck = '../../../../assets/img/blanck_persona.png';
    this.foto_mascota_blanck = '../../../../assets/img/blanck_mascota.png',
    this.foto_vehiculo_blanck = '../../../../assets/img/blanck_vehiculo.png';
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
            this._api.postTypeRequest('profile/get-tag', {id:params['id'], tabla:"personas"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.persona = res.data[0];
                    this.createFormPersona(this.userId, 'personal', this.persona);
                    this._com.setTabEditor(this.persona.nombre + ' ' + this.persona.apellido);
                    this.tipo_form = 'persona';
                    this.foto_formulario = this.persona.foto!=''?(this.URL + this.persona.foto):this.foto_persona_blanck;
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
            this._api.postTypeRequest('profile/get-tag', {id:params['id'], tabla:"mascotas"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.mascota = res.data[0];
                    console.log(this.mascota);
                    this.createFormMascota(this.userId, 'adicional', this.mascota);
                    this._com.setTabEditor(this.mascota.nombre + ' - ' + this.mascota.especie);
                    this.tipo_form = 'mascota';
                    this.foto_formulario = this.mascota.foto!=''?(this.URL + this.mascota.foto):this.foto_mascota_blanck;
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
            this._api.postTypeRequest('profile/get-tag', {id:params['id'], tabla:"vehiculos"}).subscribe({
              next: (res: any) => {
                if(res.status == 1){
                  if(res.data.length){
                    this.vehiculo = res.data[0];
                    console.log(this.vehiculo);
                    this.createFormVehiculo(this.userId, 'adicional', this.vehiculo);
                    this._com.setTabEditor(this.vehiculo.marca + ' - ' + this.vehiculo.modelo);
                    this.tipo_form = 'vehiculo';
                    this.foto_formulario = this.vehiculo.foto!=''?(this.URL + this.vehiculo.foto):this.foto_vehiculo_blanck;
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
      this.modalService.dismissAll();
      if(e){
        if(this.red_input_seleccion != undefined){
          this.sociales[this.red_input_seleccion] = e;
        } else{
          this.sociales.push(e);
        }
        this.form.patchValue({ red:JSON.stringify(this.sociales) });
      }
        this.red_input_seleccion = undefined;
    }

  //maneja el modal de confirmacion de eliminación
    abrir_confirmar( e:any, i:number ){
      this.red_delete_selection = i;
      this.texto_confirmacion = 'Estás seguro de eliminar el vínculo a ' + this.redes[this.sociales[i].id_red].nombre + '?';
      e.stopPropagation();
      this.modalService.open(this.modal_confirmacion, { centered: true, size: 'sm' });
    }
    cerrar_confirmar( value:boolean){
      this.modalService.dismissAll();
      if(value){
        this.sociales.splice(this.red_delete_selection, 1);
        this.form.patchValue({ red:JSON.stringify(this.sociales) });
      }
    }

  capturaFile(event:any):any{
    const archivoCapturado = event.target.files[0];
    if ((archivoCapturado.type == 'image/jpg') || (archivoCapturado.type == 'image/jpeg') || (archivoCapturado.type == 'image/png')){
      if (archivoCapturado.size < 10485760) {
        this._fileservice.extraerBase64(archivoCapturado).then( (imagen:any) => {
          this.foto_formulario = imagen.base;
          this.estado_foto = 'ok';
          this.form.patchValue({ foto:imagen.base });
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
    this.estado_form = false;
    try {
      if(!this.tag.id || this.tag.id < 0){
        //error
        throw 'error de id';
      } else{
        let ruta = '';
        if(this.tag.id == 0){
          //Crea tag
          this._api.postTypeRequest('profile/create-tag', this.form.value).subscribe( (value:any) => {
            estado_submit(value.status, value.data, 'create');
          })
        } else if(this.tag.id > 0){
          //Edita tag
          this._api.putTypeRequest('profile/edit-tag', this.form.value).subscribe( (value:any) => {
            estado_submit(value.status, value.data, 'edit');
          })
        }
        const estado_submit = (status:number, data:any, operation:string) => {
          let text_notifier = '';
          if(operation == 'create'){
            text_notifier = 'El Tag se ha creado con éxito!';
          } else if(operation == 'edit'){
            text_notifier = 'El Tag se ha modificado con éxito!';
          } else{
            throw 'error de operación';
          }
          if((status != 0)&&(data.affectedRows != 0)){
            this._com.setNotifier({display: true, state:'alert-success', text:text_notifier, time:2500})
            setTimeout(() => {
              this._router.navigate(['profile/tags/all-tag']);
            }, 2500);
          } else{
            this._com.setNotifier({display: true, state:'alert-danger', text:'Ha sucedido un error. Intente nuevamente.', time:2500})
            setTimeout(() => {
              this.ngOnInit();
            }, 2500);
          }
        }
      }
    } catch (error) {
      console.error(error);
        this.load_form = false;
        this.error_form = true;
        this.activeTabs = false;
    }
    
  }

  cancelForm(){
    this._router.navigate(['profile/tags/all-tag']);
  }

  createFormPersona(userId:number, nivel:string, data?:Persona){
    this.form = new FormGroup({
      id: new FormControl((data)?data.id:'0'),
      foto: new FormControl((data)?data.foto:''),
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
      red: new FormControl((data)?data.red:''),
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
      id: new FormControl((data)?data.id:'0'),
      foto: new FormControl((data)?data.foto:''),
      nombre: new FormControl((data)?data.nombre:'',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
    ),
      especie: new FormControl((data)?data.especie:'',
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
      fechanac: new FormControl((data)?data.fechanac:''),
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
