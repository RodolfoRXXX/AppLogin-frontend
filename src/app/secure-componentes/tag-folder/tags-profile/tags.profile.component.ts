import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-profile',
  templateUrl: './tags.profile.component.html',
  styleUrls: ['./tags.profile.component.css']
})
export class TagsProfileComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  irTablero(){
    this._router.navigate(['profile']);
  }

}
