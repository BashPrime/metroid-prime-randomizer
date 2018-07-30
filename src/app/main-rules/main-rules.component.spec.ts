import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRulesComponent } from './main-rules.component';

describe('MainRulesComponent', () => {
  let component: MainRulesComponent;
  let fixture: ComponentFixture<MainRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
