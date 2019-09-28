import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSeedComponent } from './generated-seed.component';

describe('GeneratedSeedComponent', () => {
  let component: GeneratedSeedComponent;
  let fixture: ComponentFixture<GeneratedSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
