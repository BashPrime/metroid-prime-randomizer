import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOverridesComponent } from './item-overrides.component';

describe('ItemOverridesComponent', () => {
  let component: ItemOverridesComponent;
  let fixture: ComponentFixture<ItemOverridesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOverridesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOverridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
