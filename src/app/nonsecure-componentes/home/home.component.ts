import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { array_images } from 'src/app/entidades/array_images_home';
import { EmailService } from 'src/app/services/email.service';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  form_state: boolean;
  form_email: string;
  slides: string[];

  slides$ = new BehaviorSubject<string[]>(['']);

  constructor(
    private _email: EmailService
  ) {
    this.slides = array_images;
    this.form_state = true;
    this.form_email = 'load';
  }

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );
  }

  scrollToElement($element:any): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.form_state = false;
    this._email.bifurcador('message', null, 'info@qrlink.com.ar', null, form.value );
    this.form_email = 'ok';
    setTimeout(() => {
      this.form_state = true;
      this.form_email = 'load';
      form.reset();
    }, 5000);
  }
}
