import { TestBed } from '@angular/core/testing';

import { SeedService } from './seed.service';

describe('SeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeedService = TestBed.get(SeedService);
    expect(service).toBeTruthy();
  });
});
