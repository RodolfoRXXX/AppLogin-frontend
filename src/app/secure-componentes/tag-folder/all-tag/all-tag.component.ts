import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/entidades/tag';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-all-tag',
  templateUrl: './all-tag.component.html',
  styleUrls: ['./all-tag.component.css']
})
export class AllTagComponent implements OnInit {

  tagPersonalExist: boolean = false; //Se comprueba si hay un tag-ID personal creado
  tagAdicionalExist: boolean = false; //Se comprueba si hay tag-ID adicionales creados
  userId: any;
  personas: Persona[];

  constructor(
    private _router: Router,
    private _com: ComunicationService,
    private _auth: AuthService,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this._com.setTabEditor('Mis Tags');
    let data = this._auth.getUserId();
    if(data){
      this.userId = (JSON.parse(data));
      this._api.postTypeRequest('profile/getTagPersonas', {id:this.userId})
      
      .subscribe({
        next: (res: any) => {
          if(res.status == 1){
            if(res.data.length){
              this.personas = res.data;
              console.log(this.personas);
              this.personas.forEach(element => {
                if (element.nivel == 'personal') {
                  this.tagPersonalExist = true;
                } else if(element.nivel == 'adicional'){
                  this.tagAdicionalExist = true;
                }
              });
            } else{
              console.log('nada');
            }
            
          }
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          //Hacer algo que se realice pese a que el requestHttp dé error o éxito
        },
      })
    }
  }

  editTag(tipo:string, id:number){
      this._router.navigate([`profile/tags/edit-tag/${tipo}/${id}`]);
  }
  verTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/ver-tag/${tipo}/${id}`]);
  }
  vincularTag(tipo:string, id:number){
    this._router.navigate([`profile/tags/vincular-tag/${tipo}/${id}`]);
}

}
