import { Component, OnInit, Input } from '@angular/core';

import { ModalComponent } from '../components/common/modal.component';
import { details, Difficulty } from '../../../../common/data/settingsDetails';
import { TrickItem } from '../../../../common/models/trickItem';

interface TrickDetailObject {
  [key: string]: TrickItem[];
}

@Component({
  selector: 'app-tricks-detail-modal',
  templateUrl: './tricks-detail-modal.component.html',
  styleUrls: ['./tricks-detail-modal.component.scss']
})
export class TricksDetailModalComponent extends ModalComponent implements OnInit {
  @Input() private tricks: string[];

  readonly DETAILS = details;
  private detailedTricks: TrickDetailObject = {};

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setDetailedTricks(this.buildTricksObject());
  }

  getDetailedTricks(): TrickDetailObject {
    return this.detailedTricks;
  }

  getDetailedTrickKeys(): string[] {
    return Object.keys(this.detailedTricks);
  }

  setDetailedTricks(detailedTricks: TrickDetailObject) {
    this.detailedTricks = detailedTricks;
  }

  private buildTricksObject(): TrickDetailObject {
    const detailedTricks: TrickDetailObject = {
      [Difficulty.TRIVIAL]: [],
      [Difficulty.EASY]: [],
      [Difficulty.NORMAL]: [],
      [Difficulty.HARD]: [],
      [Difficulty.INSANE]: [],
      [Difficulty.OOB]: []
    };

    for (let trick of this.tricks) {
      const trickItem = this.buildTrickItem(trick);
      detailedTricks[trickItem.difficulty].push(trickItem);
    }

    return Object.keys(detailedTricks)
      .filter(key => detailedTricks[key].length > 0)
      .reduce((obj, key) => {
        obj[key] = detailedTricks[key];
        return obj;
      }, {});
  }

  private buildTrickItem(trickName: string): TrickItem {
    const trickDetails = this.DETAILS[trickName];

    return {
      label: trickDetails ? trickDetails.name : trickName,
      value: trickName,
      tooltip: trickDetails
      ? trickDetails.description
      : null,
      difficulty: trickDetails ? trickDetails.difficulty : null
    };
  }
}
