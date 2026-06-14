import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRestaurantesComponent } from './lista-restaurantes';

describe('ListaRestaurantes', () => {
  let component: ListaRestaurantesComponent;
  let fixture: ComponentFixture<ListaRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRestaurantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
