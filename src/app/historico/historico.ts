import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao';
import { AvaliacoesService } from '../services/avaliacoes';
import { RestaurantesService } from '../services/restaurantes';
import { Usuario } from '../models/usuario.model';
import { Avaliacao } from '../models/avaliacao.model';
import { TIPOS_RESTAURANTE } from '../models/tipos-restaurante';
import { forkJoin } from 'rxjs';
import { EstrelasComponent } from '../estrelas/estrelas';

interface AvaliacaoComRestaurante extends Avaliacao {
  restauranteNome?: string;
  restauranteTipo?: string;
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule, EstrelasComponent],
  templateUrl: './historico.html',
  styleUrl: './historico.css'
})
export class HistoricoComponent implements OnInit {
  usuario: Usuario | null = null;
  avaliacoes: AvaliacaoComRestaurante[] = [];
  avaliacoesFiltradas: AvaliacaoComRestaurante[] = [];

  tipos = TIPOS_RESTAURANTE;
  termoPesquisa: string = '';
  tipoSelecionado: string = '';

  constructor(
    private autenticacaoService: AutentificacaoService,
    private avaliacoesService: AvaliacoesService,
    private restaurantesService: RestaurantesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.autenticacaoService.usuarioAtual;

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.carregarHistorico();
  }

  carregarHistorico(): void {
    if (!this.usuario?.id) return;

    forkJoin({
      avaliacoes: this.avaliacoesService.getByUsuario(this.usuario.id),
      restaurantes: this.restaurantesService.getAll()
    }).subscribe(({ avaliacoes, restaurantes }) => {
      const mapaRestaurantes = new Map(restaurantes.map(r => [r.id, r]));

      this.avaliacoes = avaliacoes
        .sort((a, b) => b.data.localeCompare(a.data))
        .map(av => {
          const restaurante = mapaRestaurantes.get(av.restauranteId);
          return {
            ...av,
            restauranteNome: restaurante?.nome,
            restauranteTipo: restaurante?.tipo
          };
        });

      this.filtrar();
    });
  }

  filtrar(): void {
    this.avaliacoesFiltradas = this.avaliacoes.filter(av => {
      const bateNome = !this.termoPesquisa ||
        av.restauranteNome?.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      const bateTipo = !this.tipoSelecionado || av.restauranteTipo === this.tipoSelecionado;
      return bateNome && bateTipo;
    });
  }
}