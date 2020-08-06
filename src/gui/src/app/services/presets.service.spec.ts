import { TestBed } from '@angular/core/testing';

import { PresetsService } from './presets.service';

describe('PresetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresetsService = TestBed.get(PresetsService);
    expect(service).toBeTruthy();
  });
});
