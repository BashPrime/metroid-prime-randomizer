import { Component, OnInit } from '@angular/core';
import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { Randomizer } from '../../common/randomizer/Randomizer';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  model = {};
  tabs = [
    'ROM Settings',
    'Main Rules',
    // 'Detailed Logic',
    // 'Other'
  ];
  selectedTab = 0;
  patching = false;
  patchUpdate;

  constructor(private randomizerService: RandomizerService, private electronService: ElectronService) { }

  ngOnInit() {
    this.model = this.randomizerService.getSettings();

    this.electronService.ipcRenderer.on('patched', (event, arg) => {
      this.patchUpdate = null;
      alert('Game has been patched');
      this.patching = false;
    });

    this.electronService.ipcRenderer.on('patching-error', (event, arg) => {
      alert('An error occurred during patching: ' + JSON.stringify(arg));
      this.patching = false;
    });

    this.electronService.ipcRenderer.on('patch-update', (event, arg) => {
      this.patchUpdate = arg;
    });
  }

  runRandomizer() {
    this.patching = true;
    const game = JSON.parse(JSON.stringify(this.randomizerService.getSettings()));
    const randomizer = new Randomizer(game['mode'], game['logic'], game['artifacts'], game['difficulty']);

    if (game['seed']) {
      game['seed'] = game['seed'] < 1 ? 1 : game['seed'] > 999999999 ? 999999999 : game['seed'];
      randomizer.randomize(game['seed']);
    } else {
      randomizer.randomize();
      game['seed'] = randomizer.getSeed();
    }

    game['layoutDescriptor'] = randomizer.getWorld().generateLayout();

    this.electronService.ipcRenderer.send('randomizer', game);
  }

}
