import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratorService } from '../services/generator.service';
import { RandomizerService } from '../randomizer.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  private tabs: Tab[] = [
    { name: 'ROM Settings', route: 'rom-settings' },
    { name: 'Rules', route: 'rules' },
    { name: 'Logic', route: 'logic' },
    { name: 'History', route: '/history' }
  ];
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    this.randomizerService.forms$.randomizer.subscribe(form => {
      if (form && form.value) {
        this.form.patchValue(form.value);
      }
    });

    this.createForm();
  }

  getForm(): FormGroup {
    return this.form;
  }

  getTabs(): Tab[] {
    return this.tabs;
  }

  generateSeed() {
    this.generatorService.generateSeed();
  }

  createForm() {
    const fb = new FormBuilder();

    this.form = fb.group({
      seed: [null, [Validators.min(1), Validators.max(Number.MAX_SAFE_INTEGER)]]
    });

    this.randomizerService.replaceForm('randomizer', this.form);
  }
}

interface Tab {
  name: string;
  route: string;
}
