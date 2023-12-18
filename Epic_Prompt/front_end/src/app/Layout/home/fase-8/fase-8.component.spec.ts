import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase8Component } from './fase-8.component';

describe('Fase8Component', () => {
  let component: Fase8Component;
  let fixture: ComponentFixture<Fase8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fase8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Fase8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
