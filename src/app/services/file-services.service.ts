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

  generateSafeImageUrl(image:any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image[0]));
  }

}
