import { TestBed } from '@angular/core/testing';

import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomizerService = TestBed.get(RandomizerService);
    expect(service).toBeTruthy();
  });
});
