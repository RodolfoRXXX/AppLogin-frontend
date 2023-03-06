import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isOpenMenu!: boolean;
  sideMode!: any;

  constructor(
    private readonly comSvc: ComunicationService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.comSvc.sidenav$.subscribe( (value: boolean) => this.isOpenMenu = value )
    this.breakpointObserver
        .observe(['(min-width: 600px)'])
        .subscribe((state: BreakpointState) => {
          if(state.matches){
            this.sideMode = 'side';
          } else{
            this.sideMode = 'over';
          }
        });
  }

  closedSidenav() {
    if(this.isOpenMenu) this.comSvc.setSidenav();
  }


}
