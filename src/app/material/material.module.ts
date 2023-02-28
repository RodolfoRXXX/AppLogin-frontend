import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [ //aquí se exportan los módulos de Material que queremos usar
    //MatToolbarModule,
    //MatIconModule
  ]
})
export class MaterialModule { }
