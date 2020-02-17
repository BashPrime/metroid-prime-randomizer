import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingSeedModalComponent } from './generating-seed-modal.component';

describe('GeneratingSeedModalComponent', () => {
  let component: GeneratingSeedModalComponent;
  let fixture: ComponentFixture<GeneratingSeedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratingSeedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingSeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
