import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoComponent } from './avaliacao';

describe('Avaliacao', () => {
  let component: AvaliacaoComponent;
  let fixture: ComponentFixture<AvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
