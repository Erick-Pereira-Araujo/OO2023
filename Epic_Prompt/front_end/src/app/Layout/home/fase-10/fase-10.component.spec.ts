import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase10Component } from './fase-10.component';

describe('Fase10Component', () => {
  let component: Fase10Component;
  let fixture: ComponentFixture<Fase10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fase10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Fase10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
