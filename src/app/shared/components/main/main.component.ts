import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isOpenMenu!: boolean;

  constructor(
    private readonly comSvc: ComunicationService
  ) {}

  ngOnInit(): void {
    this.comSvc.sidenav$.subscribe( (value: boolean) => this.isOpenMenu = value )
  }

  closedSidenav() {
    if(this.isOpenMenu) this.comSvc.setSidenav();
  }


}
