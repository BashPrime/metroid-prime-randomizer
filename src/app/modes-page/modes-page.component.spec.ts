import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModesPageComponent } from './modes-page.component';

describe('ModesPageComponent', () => {
  let component: ModesPageComponent;
  let fixture: ComponentFixture<ModesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
