import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeIsoDiagnosticsModalComponent } from './prime-iso-diagnostics-modal.component';

describe('PrimeIsoDiagnosticsModalComponent', () => {
  let component: PrimeIsoDiagnosticsModalComponent;
  let fixture: ComponentFixture<PrimeIsoDiagnosticsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeIsoDiagnosticsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeIsoDiagnosticsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
