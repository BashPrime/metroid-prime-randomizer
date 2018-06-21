import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getLocalFile(fileName: string) {
    return this.http.get(fileName);
  }

  getLocalFileAsString(fileName: string) {
    return this.http.get(fileName, { responseType: 'text' });
  }
}
