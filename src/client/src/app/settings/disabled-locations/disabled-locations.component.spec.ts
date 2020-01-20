import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledLocationsComponent } from './disabled-locations.component';

describe('DisabledLocationsComponent', () => {
  let component: DisabledLocationsComponent;
  let fixture: ComponentFixture<DisabledLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
