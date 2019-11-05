import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPanelMultiselectComponent } from './two-panel-multiselect.component';

describe('TwoPanelMultiselectComponent', () => {
  let component: TwoPanelMultiselectComponent;
  let fixture: ComponentFixture<TwoPanelMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoPanelMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoPanelMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
