import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RomSettingsComponent } from './rom-settings.component';

describe('RomSettingsComponent', () => {
  let component: RomSettingsComponent;
  let fixture: ComponentFixture<RomSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RomSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
