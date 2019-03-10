import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }

  getRandomizerVersion() {
    return this.http.get('https://raw.githubusercontent.com/etaylor8086/metroid-prime-randomizer/master/package.json');
  }
}
