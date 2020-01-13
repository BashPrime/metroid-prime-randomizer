import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlySettingsComponent } from './read-only-settings.component';

describe('ReadOnlySettingsComponent', () => {
  let component: ReadOnlySettingsComponent;
  let fixture: ComponentFixture<ReadOnlySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
