import { Injectable } from '@angular/core';
import { version } from '../../../../../package.json';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  readonly APP_VERSION = version;

  constructor() { }
}
