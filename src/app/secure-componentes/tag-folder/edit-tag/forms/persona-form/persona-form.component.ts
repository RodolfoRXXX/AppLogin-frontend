import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => PersonaFormComponent ),
      multi: true
    }
  ]
})
export class PersonaFormComponent implements OnInit, ControlValueAccessor {

  isDisabled: boolean;

  constructor() { }

  onChange = () => {}; //métodos que agrego y ejecuto en alguna función que genere cambios
  onTouched = () => {};

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    //escribe alguna variable interna con valores que vengan desde el formulario
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(state: boolean): void {
    this.isDisabled = state;
  }

}
