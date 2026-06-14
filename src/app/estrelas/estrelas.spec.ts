import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estrelas } from './estrelas';

describe('Estrelas', () => {
  let component: Estrelas;
  let fixture: ComponentFixture<Estrelas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estrelas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estrelas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
