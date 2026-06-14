import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRestaurantes } from './lista-restaurantes';

describe('ListaRestaurantes', () => {
  let component: ListaRestaurantes;
  let fixture: ComponentFixture<ListaRestaurantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRestaurantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRestaurantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
