import { TestBed, inject } from '@angular/core/testing';

import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomizerService]
    });
  });

  it('should be created', inject([RandomizerService], (service: RandomizerService) => {
    expect(service).toBeTruthy();
  }));
});
