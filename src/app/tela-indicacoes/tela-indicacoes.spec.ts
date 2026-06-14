import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaIndicacoesComponent } from './tela-indicacoes';

describe('TelaIndicacoes', () => {
  let component: TelaIndicacoesComponent;
  let fixture: ComponentFixture<TelaIndicacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaIndicacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaIndicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
