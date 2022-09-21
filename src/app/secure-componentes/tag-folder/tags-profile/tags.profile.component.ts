import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-tags-profile',
  templateUrl: './tags.profile.component.html',
  styleUrls: ['./tags.profile.component.css']
})
export class TagsProfileComponent implements OnInit {

  vistaTag:string = 'Mis Tags';


  constructor(
    private _router: Router,
    private _com: ComunicationService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._com.getTabEditor().subscribe( value => {
      this.vistaTag = value;
    } )
  }

  //Detecta los cambios realizados sobre las variables después del check detection
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  irTablero(){
    this._router.navigate(['profile']);
  }

}
