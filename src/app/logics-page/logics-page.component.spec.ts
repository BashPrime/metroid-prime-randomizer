import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicsPageComponent } from './logics-page.component';

describe('LogicsPageComponent', () => {
  let component: LogicsPageComponent;
  let fixture: ComponentFixture<LogicsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
