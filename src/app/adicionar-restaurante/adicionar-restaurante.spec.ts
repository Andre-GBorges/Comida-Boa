import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRestauranteComponent } from './adicionar-restaurante';

describe('AdicionarRestaurante', () => {
  let component: AdicionarRestauranteComponent;
  let fixture: ComponentFixture<AdicionarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
