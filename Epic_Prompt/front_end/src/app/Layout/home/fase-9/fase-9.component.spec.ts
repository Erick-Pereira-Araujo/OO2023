import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase9Component } from './fase-9.component';

describe('Fase9Component', () => {
  let component: Fase9Component;
  let fixture: ComponentFixture<Fase9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fase9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Fase9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
