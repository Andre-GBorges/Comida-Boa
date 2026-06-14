import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRestaurante } from './adicionar-restaurante';

describe('AdicionarRestaurante', () => {
  let component: AdicionarRestaurante;
  let fixture: ComponentFixture<AdicionarRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarRestaurante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarRestaurante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
