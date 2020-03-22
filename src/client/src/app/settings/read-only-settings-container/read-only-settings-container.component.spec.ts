import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlySettingsContainerComponent } from './read-only-settings-container.component';

describe('ReadOnlySettingsContainerComponent', () => {
  let component: ReadOnlySettingsContainerComponent;
  let fixture: ComponentFixture<ReadOnlySettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlySettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlySettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
