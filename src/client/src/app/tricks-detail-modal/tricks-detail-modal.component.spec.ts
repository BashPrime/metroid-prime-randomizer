import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TricksDetailModalComponent } from './tricks-detail-modal.component';

describe('TricksDetailModalComponent', () => {
  let component: TricksDetailModalComponent;
  let fixture: ComponentFixture<TricksDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TricksDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TricksDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
