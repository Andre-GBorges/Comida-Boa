import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { AutentificacaoService } from '../services/autentificacao';
import { TIPOS_RESTAURANTE } from '../models/tipos-restaurante';

@Component({
  selector: 'app-adicionar-restaurante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adicionar-restaurante.html',
  styleUrl: './adicionar-restaurante.css'
})
export class AdicionarRestauranteComponent implements OnInit {
  form: FormGroup;
  tipos = TIPOS_RESTAURANTE;
  erroGeral: boolean = false;

  constructor(
    private fb: FormBuilder,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      localizacao: ['', Validators.required],
      tipo: ['', Validators.required],
      sobreNos: [''],
      menuFoto: [''],
      nota: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // só usuários logados podem cadastrar (precisa "assinar" a avaliação)
    if (!this.autenticacaoService.isLogado()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.erroGeral = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.autenticacaoService.usuarioAtual;
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    const { nome, foto, localizacao, tipo, sobreNos, menuFoto, nota, comentario } = this.form.value;

    const novoRestaurante = {
      nome, foto, localizacao, tipo,
      sobreNos: sobreNos || '',
      menuFoto: menuFoto || ''
    };

    // 1. cria o restaurante
    this.restaurantesService.create(novoRestaurante).subscribe({
      next: (restauranteCriado) => {
        const novaAvaliacao = {
          restauranteId: restauranteCriado.id!,
          usuarioId: usuario.id!,
          nomeUsuario: usuario.nome,
          nota: Number(nota),
          comentario,
          data: new Date().toISOString().split('T')[0]
        };

        // 2. cria a avaliacao vinculada ao restaurante recem-criado
        this.avaliacoesService.create(novaAvaliacao).subscribe({
          next: () => this.router.navigate(['/restaurante', restauranteCriado.id]),
          error: () => this.erroGeral = true
        });
      },
      error: () => this.erroGeral = true
    });
  }
}