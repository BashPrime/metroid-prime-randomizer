import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGameComponent } from './generate-game.component';

describe('GenerateGameComponent', () => {
  let component: GenerateGameComponent;
  let fixture: ComponentFixture<GenerateGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
