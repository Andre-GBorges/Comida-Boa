import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantePerto } from './restaurante-perto';

describe('RestaurantePerto', () => {
  let component: RestaurantePerto;
  let fixture: ComponentFixture<RestaurantePerto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantePerto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantePerto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
