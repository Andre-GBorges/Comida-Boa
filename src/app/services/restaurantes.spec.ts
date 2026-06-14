import { TestBed } from '@angular/core/testing';

import { Restaurantes } from './restaurantes';

describe('Restaurantes', () => {
  let service: Restaurantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Restaurantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
