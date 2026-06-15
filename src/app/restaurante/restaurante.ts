import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';
import { EstrelasComponent } from '../estrelas/estrelas';

@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [CommonModule, RouterLink, EstrelasComponent],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css'
})
export class RestauranteComponent implements OnInit {
  restaurante: Restaurante | null = null;
  avaliacoes: Avaliacao[] = [];

  constructor(
    private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restaurantesService.getById(id).subscribe(restaurante => {
      this.restaurante = restaurante;
    });

    this.avaliacoesService.getByRestaurante(id).subscribe(avaliacoes => {
      this.avaliacoes = avaliacoes.sort((a, b) => b.data.localeCompare(a.data));
    });
  }
}