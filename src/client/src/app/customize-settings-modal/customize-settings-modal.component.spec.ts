import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeSettingsModalComponent } from './customize-settings-modal.component';

describe('CustomizeSettingsModalComponent', () => {
  let component: CustomizeSettingsModalComponent;
  let fixture: ComponentFixture<CustomizeSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
