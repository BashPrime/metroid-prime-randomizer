import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePresetModalComponent } from './save-preset-modal.component';

describe('SavePresetModalComponent', () => {
  let component: SavePresetModalComponent;
  let fixture: ComponentFixture<SavePresetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePresetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePresetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
