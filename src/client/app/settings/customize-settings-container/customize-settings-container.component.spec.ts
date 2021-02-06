import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeSettingsContainerComponent } from './customize-settings-container.component';

describe('CustomizeSettingsContainerComponent', () => {
  let component: CustomizeSettingsContainerComponent;
  let fixture: ComponentFixture<CustomizeSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
