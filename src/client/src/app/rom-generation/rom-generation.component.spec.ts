import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RomGenerationComponent } from './rom-generation.component';

describe('RomGenerationComponent', () => {
  let component: RomGenerationComponent;
  let fixture: ComponentFixture<RomGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RomGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RomGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
