import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantesService } from '../services/restaurantes';
import { Restaurante } from '../models/restaurante.model';
import { TIPOS_RESTAURANTE } from '../models/tipos-restaurante';

@Component({
  selector: 'app-lista-restaurantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-restaurantes.html',
  styleUrl: './lista-restaurantes.css'
})
export class ListaRestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  tipos = TIPOS_RESTAURANTE;
  termoPesquisa: string = '';
  tipoSelecionado: string = '';

  constructor(private restaurantesService: RestaurantesService) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.restaurantesService.getAll(this.termoPesquisa, this.tipoSelecionado)
      .subscribe(restaurantes => this.restaurantes = restaurantes);
  }
}