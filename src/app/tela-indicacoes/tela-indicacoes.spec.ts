import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaIndicacoes } from './tela-indicacoes';

describe('TelaIndicacoes', () => {
  let component: TelaIndicacoes;
  let fixture: ComponentFixture<TelaIndicacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaIndicacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaIndicacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
