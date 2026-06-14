import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';
import { RestaurantesService } from '../services/restaurantes';
import { AvaliacoesService } from '../services/avaliacoes';
import { FotosMenuService } from '../services/fotos-menu';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';
import { FotoMenu } from '../models/foto-menu.model';
import { EstrelasComponent } from '../estrelas/estrelas';

@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EstrelasComponent],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.css'
})
export class RestauranteComponent implements OnInit {
  restaurante: Restaurante | null = null;
  avaliacoes: Avaliacao[] = [];
  fotosMenu: FotoMenu[] = [];

  novaFotoMenuUrl: string = '';
  erroFotoMenu: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private fotosMenuService: FotosMenuService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restaurantesService.getById(id).subscribe(restaurante => {
      this.restaurante = restaurante;
    });

    this.avaliacoesService.getByRestaurante(id).subscribe(avaliacoes => {
      this.avaliacoes = avaliacoes.sort((a, b) => b.data.localeCompare(a.data));
    });

    this.carregarFotosMenu(id);
  }

  carregarFotosMenu(id: number): void {
    this.fotosMenuService.getByRestaurante(id).subscribe(fotos => {
  
      this.fotosMenu = fotos.sort((a, b) => b.data.localeCompare(a.data));
    });
  }

  adicionarFotoMenu(): void {
    this.erroFotoMenu = false;

    if (!this.novaFotoMenuUrl.trim() || !this.restaurante?.id) {
      this.erroFotoMenu = true;
      return;
    }

    const novaFoto: FotoMenu = {
      restauranteId: this.restaurante.id,
      foto: this.novaFotoMenuUrl.trim(),
      data: new Date().toISOString().split('T')[0]
    };

    this.fotosMenuService.create(novaFoto).subscribe(() => {
      this.novaFotoMenuUrl = '';
      this.carregarFotosMenu(this.restaurante!.id!);

      const modalEl = document.getElementById('modalFotoMenu');
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();
      }
    });
  }
}