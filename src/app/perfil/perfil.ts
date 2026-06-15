import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao';
import { AvaliacoesService } from '../services/avaliacoes';
import { RestaurantesService } from '../services/restaurantes';
import { Usuario } from '../models/usuario.model';
import { Avaliacao } from '../models/avaliacao.model';
import { forkJoin } from 'rxjs';
import { EstrelasComponent } from '../estrelas/estrelas';

interface AvaliacaoComRestaurante extends Avaliacao {
  restauranteNome?: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, EstrelasComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  avaliacoesRecentes: AvaliacaoComRestaurante[] = [];
  mostrarSucesso: boolean = false;

  constructor(
    private route: ActivatedRoute,
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

    this.carregarAvaliacoesRecentes();

    if (this.route.snapshot.queryParamMap.get('sucesso')) {
      this.mostrarSucesso = true;
      setTimeout(() => this.mostrarSucesso = false, 3000);
    }
  }

  carregarAvaliacoesRecentes(): void {
    if (!this.usuario?.id) return;

    forkJoin({
      avaliacoes: this.avaliacoesService.getByUsuario(this.usuario.id),
      restaurantes: this.restaurantesService.getAll()
    }).subscribe(({ avaliacoes, restaurantes }) => {
      const mapaRestaurantes = new Map(restaurantes.map(r => [r.id, r.nome]));

      this.avaliacoesRecentes = avaliacoes
        .sort((a, b) => b.data.localeCompare(a.data))
        .slice(0, 3)
        .map(av => ({
          ...av,
          restauranteNome: mapaRestaurantes.get(av.restauranteId)
        }));
    });
  }
}