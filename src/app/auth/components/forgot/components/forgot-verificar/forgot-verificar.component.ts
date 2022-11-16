import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-verificar',
  templateUrl: './forgot-verificar.component.html',
  styleUrls: ['./forgot-verificar.component.css']
})
export class ForgotVerificarComponent implements OnInit {

  @Output() estado: EventEmitter<any>;
  @Input() user_email:string;

  @ViewChild("input1") input1: ElementRef;
  @ViewChild("input2") input2: ElementRef;
  @ViewChild("input3") input3: ElementRef;
  @ViewChild("input4") input4: ElementRef;
  @ViewChild("input5") input5: ElementRef;
  @ViewChild("input6") input6: ElementRef;
  
  form: FormGroup;
  estadoSmt: string;
  displayLogin: boolean;
  classLogin: string;
  messageLogin: string;

  constructor(
    private _api: ApiService
  ) {
    this.estadoSmt = 'verificar';
    this.displayLogin = false;
    this.estado = new EventEmitter();
  }

  crearFormulario(email:string){
    this.form = new FormGroup({
      1:new FormControl('',
        [
          Validators.required
        ]
      ),
      2:new FormControl('',
        [
          Validators.required
        ]
      ),
      3:new FormControl('',
        [
          Validators.required
        ]
      ),
      4:new FormControl('',
        [
          Validators.required
        ]
      ),
      5:new FormControl('',
        [
          Validators.required
        ]
      ),
      6:new FormControl('',
        [
          Validators.required
        ]
      ),
      codeEmail: new FormControl(''),
      email: new FormControl((email)?email:'')
    })
  }

  ngOnInit(): void {
    this.crearFormulario(this.user_email);
  }

  ngAfterViewInit():void {
    this.input1.nativeElement.focus();
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'verificar';
      this.estadoLogin(false, '', '');
    }
  }

  cambiar_valor(e:any, numero:number){
    if((numero < 6)&&(e != '')){
      switch (numero) {
        case 1:
          this.input2.nativeElement.focus();
          break;
        case 2:
          this.input3.nativeElement.focus();
          break;
        case 3:
          this.input4.nativeElement.focus();
          break;
        case 4:
          this.input5.nativeElement.focus();
          break;
        case 5:
          this.input6.nativeElement.focus();
          break;
      }
    }
  }

  estadoLogin( display:boolean, clase:string, message:string ){
    this.displayLogin = display;
    this.classLogin = clase;
    this.messageLogin = message;
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this.form.controls['codeEmail'].setValue(
      this.form.get('1')?.value+
      this.form.get('2')?.value+
      this.form.get('3')?.value+
      this.form.get('4')?.value+
      this.form.get('5')?.value+
      this.form.get('6')?.value
    );
    this._api.putTypeRequest('user/verificate-code', this.form.value).subscribe( (res:any) => {
      if (res.status == 1){
        if(res.data == 'ok'){
          this.estadoSmt = 'ok';
          this.estadoLogin(true, 'alert-success', 'Código correcto!');
          setTimeout(() => {
            this.estado.emit('verificado');
          }, 1500);
        } else{
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-danger', 'Código incorrecto. Intentá nuevamente.');
        }   
      } else{
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido verificar el código. Intentá nuevamente.');
      }
    });
  }

  actualizar_estado(e:any){
      this.estado.emit(e);
  }

}
