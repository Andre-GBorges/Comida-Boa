import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRestaurante } from './tela-restaurante';

describe('TelaRestaurante', () => {
  let component: TelaRestaurante;
  let fixture: ComponentFixture<TelaRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRestaurante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaRestaurante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
