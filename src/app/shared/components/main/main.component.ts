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
    private shared: ComunicationService
  ) {}

  ngOnInit(): void {
    this.shared.sidenav$.subscribe( (value: boolean) => this.isOpenMenu = value )
  }

}
