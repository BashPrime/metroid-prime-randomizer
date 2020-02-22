import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePresetModalComponent } from './remove-preset-modal.component';

describe('RemovePresetModalComponent', () => {
  let component: RemovePresetModalComponent;
  let fixture: ComponentFixture<RemovePresetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePresetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePresetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
