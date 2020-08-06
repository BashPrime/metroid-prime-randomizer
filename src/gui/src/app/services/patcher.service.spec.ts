import { TestBed } from '@angular/core/testing';

import { PatcherService } from './patcher.service';

describe('PatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatcherService = TestBed.get(PatcherService);
    expect(service).toBeTruthy();
  });
});
