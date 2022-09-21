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
  personas: Persona;

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
      console.log(this.userId)
      this._api.postTypeRequest('profile/getTagPersonas', {id:this.userId}).subscribe({
        next: (res: any) => {
          if(res.status == 1){
            this.personas = res.data;
            console.log(this.personas);
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

  irEditTag(tipo:string, id:string){
      this._router.navigate([`profile/tags/edit-tag/${tipo}/${id}`]);
  }

}
