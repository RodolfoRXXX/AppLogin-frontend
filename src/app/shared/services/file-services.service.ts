import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServicesService {

  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  extraerBase64 = async ($event: any) => new Promise((res, rej) => {
    try {
      const unSafeImg = window.URL.createObjectURL($event);
      const image = this._sanitizer.bypassSecurityTrustUrl(unSafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        res({
          blob: $event,
          image,
          base: reader.result
        })
      };
      reader.onerror = error => {
        res({
          blob: $event,
          image,
          base: null
        })
      };
    } catch (error) {
        return null;
    }
  })

}
