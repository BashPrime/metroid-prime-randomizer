import { TestBed } from '@angular/core/testing';

import { DiagnosticsService } from './diagnostics.service';

describe('DiagnosticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagnosticsService = TestBed.get(DiagnosticsService);
    expect(service).toBeTruthy();
  });
});
