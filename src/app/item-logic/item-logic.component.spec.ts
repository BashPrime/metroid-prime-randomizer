import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLogicComponent } from './item-logic.component';

describe('ItemLogicComponent', () => {
  let component: ItemLogicComponent;
  let fixture: ComponentFixture<ItemLogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
