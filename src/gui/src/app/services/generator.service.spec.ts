import { TestBed } from '@angular/core/testing';

import { GeneratorService } from './generator.service';

describe('GeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratorService = TestBed.get(GeneratorService);
    expect(service).toBeTruthy();
  });
});
