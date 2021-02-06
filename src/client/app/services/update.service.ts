import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as compareVersions from 'compare-versions';

import { version } from '../../../../../package.json';
import { ElectronService } from './electron.service.js';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private http: HttpClient, private toastrService: ToastrService, private electronService: ElectronService) {

  }

  checkForUpdates(): void {
    this.http.get('https://raw.githubusercontent.com/BashPrime/metroid-prime-randomizer/master/package.json')
      .subscribe((data: any) => {
        if (compareVersions(version, data.version) < 0) {
          this.toastrService.info('Click to go to the downloads page.', 'Update Available! (v' + data.version + ')', {
            disableTimeOut: true,
            positionClass: 'toast-bottom-left'
          }).onTap.pipe(take(1)).subscribe(() => this.electronService.shell.openExternal('https://github.com/BashPrime/metroid-prime-randomizer/releases/latest'))
        }
      });
  }
}
