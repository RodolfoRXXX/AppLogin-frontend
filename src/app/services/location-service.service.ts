import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  fecha:any;

  constructor() {
    this.fecha =  (new Date).toLocaleDateString() + ' - ' + (new Date).toLocaleTimeString();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude, date: this.fecha});
        },
        err => {
          reject(err);
        }
      );
    });
  }

}
