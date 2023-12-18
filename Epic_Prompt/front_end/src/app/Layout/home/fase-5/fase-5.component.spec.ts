import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase5Component } from './fase-5.component';

describe('Fase5Component', () => {
  let component: Fase5Component;
  let fixture: ComponentFixture<Fase5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fase5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Fase5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
