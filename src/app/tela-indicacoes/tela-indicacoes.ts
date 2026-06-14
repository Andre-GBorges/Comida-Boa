import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { Restaurante } from '../models/restaurante.model';
import { TIPOS_RESTAURANTE } from '../models/tipos-restaurante';
import { EstrelasComponent } from '../estrelas/estrelas';

interface RestauranteComMedia extends Restaurante {
  mediaAvaliacoes: number;
  totalAvaliacoes: number;
}

@Component({
  selector: 'app-tela-indicacoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EstrelasComponent],
  templateUrl: './tela-indicacoes.html',
  styleUrl: './tela-indicacoes.css'
})
export class TelaIndicacoesComponent implements OnInit {
  restaurantesOrdenados: RestauranteComMedia[] = [];
  restaurantesFiltrados: RestauranteComMedia[] = [];

  tipos = TIPOS_RESTAURANTE;
  termoPesquisa: string = '';
  tipoSelecionado: string = '';

  constructor(
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService
  ) {}

  ngOnInit(): void {
    forkJoin({
      restaurantes: this.restaurantesService.getAll(),
      avaliacoes: this.avaliacoesService.getAll()
    }).subscribe(({ restaurantes, avaliacoes }) => {
      this.restaurantesOrdenados = restaurantes
        .map(restaurante => {
          const avaliacoesDoRestaurante = avaliacoes.filter(av => av.restauranteId === restaurante.id);
          const total = avaliacoesDoRestaurante.length;
          const media = total > 0
            ? avaliacoesDoRestaurante.reduce((soma, av) => soma + av.nota, 0) / total
            : 0;

          return {
            ...restaurante,
            mediaAvaliacoes: media,
            totalAvaliacoes: total
          };
        })
        .sort((a, b) => b.mediaAvaliacoes - a.mediaAvaliacoes);

      this.filtrar();
    });
  }

  filtrar(): void {
    this.restaurantesFiltrados = this.restaurantesOrdenados.filter(r => {
      const bateNome = !this.termoPesquisa || r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      const bateTipo = !this.tipoSelecionado || r.tipo === this.tipoSelecionado;
      return bateNome && bateTipo;
    });
  }
}