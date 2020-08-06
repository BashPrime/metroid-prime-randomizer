import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedHistoryComponent } from './seed-history.component';

describe('SeedHistoryComponent', () => {
  let component: SeedHistoryComponent;
  let fixture: ComponentFixture<SeedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
