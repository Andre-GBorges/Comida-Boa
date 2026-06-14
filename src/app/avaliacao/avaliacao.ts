import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { AutentificacaoService } from '../services/autentificacao';
import { Restaurante } from '../models/restaurante.model';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './avaliacao.html',
  styleUrl: './avaliacao.css'
})
export class AvaliacaoComponent implements OnInit {
  // etapa 1: busca
  termoPesquisa: string = '';
  resultados: Restaurante[] = [];
  buscou: boolean = false;

  // etapa 2: avaliacao
  restauranteSelecionado: Restaurante | null = null;
  form: FormGroup;
  enviado: boolean = false;
  erroGeral: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nota: [0, [Validators.required, Validators.min(1)]],
      data: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.autenticacaoService.isLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    // se veio de um botao "Avaliar" dentro de um restaurante especifico, pula a busca
    const restauranteId = this.route.snapshot.queryParamMap.get('restauranteId');
    if (restauranteId) {
      this.restaurantesService.getById(Number(restauranteId)).subscribe(restaurante => {
        this.selecionarRestaurante(restaurante);
      });
    }
  }

  buscar(): void {
    this.buscou = false;
    if (!this.termoPesquisa.trim()) {
      this.resultados = [];
      return;
    }

    this.restaurantesService.getAll(this.termoPesquisa).subscribe(restaurantes => {
      this.resultados = restaurantes;
      this.buscou = true;
    });
  }

  selecionarRestaurante(restaurante: Restaurante): void {
    this.restauranteSelecionado = restaurante;

    // pre-preenche a data com hoje, mas o usuario pode mudar
    const hoje = new Date().toISOString().split('T')[0];
    this.form.patchValue({ data: hoje });
  }

  selecionarNota(nota: number): void {
    this.form.patchValue({ nota });
    this.form.get('nota')?.markAsTouched();
  }

  voltar(): void {
    this.restauranteSelecionado = null;
    this.form.reset({ nota: 0, data: '', comentario: '' });
    this.enviado = false;
  }

  onSubmit(): void {
    this.erroGeral = false;

    if (this.form.invalid || !this.restauranteSelecionado) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.autenticacaoService.usuarioAtual;
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    const { nota, data, comentario } = this.form.value;

    const novaAvaliacao = {
      restauranteId: this.restauranteSelecionado.id!,
      usuarioId: usuario.id!,
      nomeUsuario: usuario.nome,
      nota: Number(nota),
      comentario,
      data
    };

    this.avaliacoesService.create(novaAvaliacao).subscribe({
      next: () => this.enviado = true,
      error: () => this.erroGeral = true
    });
  }
}