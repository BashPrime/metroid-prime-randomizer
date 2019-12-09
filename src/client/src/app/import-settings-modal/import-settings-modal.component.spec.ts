import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSettingsModalComponent } from './import-settings-modal.component';

describe('ImportSettingsModalComponent', () => {
  let component: ImportSettingsModalComponent;
  let fixture: ComponentFixture<ImportSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
