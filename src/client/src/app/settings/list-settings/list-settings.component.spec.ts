import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettingsComponent } from './list-settings.component';

describe('ListSettingsComponent', () => {
  let component: ListSettingsComponent;
  let fixture: ComponentFixture<ListSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
