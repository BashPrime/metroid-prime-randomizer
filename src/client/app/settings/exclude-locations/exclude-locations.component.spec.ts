import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeLocationsComponent } from './exclude-locations.component';

describe('ExcludeLocationsComponent', () => {
  let component: ExcludeLocationsComponent;
  let fixture: ComponentFixture<ExcludeLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcludeLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludeLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
