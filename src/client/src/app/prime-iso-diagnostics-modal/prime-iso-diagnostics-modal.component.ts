import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalComponent } from '../components/common/modal.component';
import { DiagnosticsService, IsoData } from '../services/diagnostics.service';
import { ElectronService } from '../services/electron.service';
@Component({
  selector: 'app-prime-iso-diagnostics-modal',
  templateUrl: './prime-iso-diagnostics-modal.component.html',
  styleUrls: ['./prime-iso-diagnostics-modal.component.scss']
})
export class PrimeIsoDiagnosticsModalComponent extends ModalComponent implements OnInit {
  gameCode: string;
  revision: number;
  md5Hash: string;
  private loaded: boolean = false;
  private ngUnsubscribe: Subject<any> = new Subject();

  // Constants
  readonly ICONS = {
    valid: faCheck,
    invalid: faTimes
  }
  readonly VALID_PRIME_MD5_HASHES = {
    0: 'eeacd0ced8e2bae491eca14f141a4b7c',
    2: 'fdfc41b8414dd7d24834c800f567c0f8'
  };
  readonly NTSC_METROID_PRIME_GAME_CODE = 'GM8E01';

  constructor(private diagnosticsService: DiagnosticsService, private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
    this.diagnosticsService._isoData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data) {
          this.setIsoData(data);
          this.loaded = true;
        }
      });

      this.diagnosticsService._errorParse
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.setOpen(false);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setIsoData(data: IsoData) {
    this.gameCode = data.gameCode;
    this.revision = data.revision;
    this.md5Hash = data.md5Hash;
  }

  openModal(): void {
    this.loaded = false;
    this.setOpen(true);
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  hasValidGameCode(): boolean {
    return this.gameCode === this.NTSC_METROID_PRIME_GAME_CODE;
  }

  gameCodeIsMetroidPrime() {
    return this.gameCode.substr(1, 2) === this.NTSC_METROID_PRIME_GAME_CODE.substr(1, 2);
  }

  gameCodeIsNTSC() {
    return this.gameCode.substr(3) === this.NTSC_METROID_PRIME_GAME_CODE.substr(3);
  }

  hasValidMd5Hash(): boolean {
    const validHash = this.VALID_PRIME_MD5_HASHES[this.revision];
    return validHash && this.md5Hash === validHash;
  }

  saveIsoData(): void {
    this.diagnosticsService.saveIsoData({
      gameCode: this.gameCode,
      revision: this.revision,
      md5Hash: this.md5Hash
    });
  }
}
