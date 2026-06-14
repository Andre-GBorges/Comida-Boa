import { TestBed } from '@angular/core/testing';

import { Avaliacoes } from './avaliacoes';

describe('Avaliacoes', () => {
  let service: Avaliacoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Avaliacoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
