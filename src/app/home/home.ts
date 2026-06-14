import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';
import { EstrelasComponent } from '../estrelas/estrelas';

interface RestauranteComAvaliacoes extends Restaurante {
  avaliacoesRecentes: Avaliacao[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, EstrelasComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  restaurantes: RestauranteComAvaliacoes[] = [];

  constructor(
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService
  ) {}

  ngOnInit(): void {
    this.restaurantesService.getAll().subscribe(restaurantes => {
      if (restaurantes.length === 0) {
        this.restaurantes = [];
        return;
      }

      // uma requisição de "avaliações recentes" pra cada restaurante
      const requisicoes = restaurantes.map(r =>
        this.avaliacoesService.getRecentesByRestaurante(r.id!, 2)
      );

      forkJoin(requisicoes).subscribe(listasDeAvaliacoes => {
        this.restaurantes = restaurantes.map((restaurante, index) => ({
          ...restaurante,
          avaliacoesRecentes: listasDeAvaliacoes[index]
        }));
      });
    });
  }
}