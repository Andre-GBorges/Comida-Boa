import { TestBed } from '@angular/core/testing';

import { FotosMenu } from './fotos-menu';

describe('FotosMenu', () => {
  let service: FotosMenu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosMenu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
