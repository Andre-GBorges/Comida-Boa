import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  usuarioLogado$: Observable<Usuario | null>;

  constructor(
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.usuarioLogado$ = this.autenticacaoService.usuarioLogado$;
  }

  confirmarLogout(): void {
    const confirmar = confirm('Tem certeza que deseja deslogar?');
    if (confirmar) {
      this.autenticacaoService.logout();
      this.router.navigate(['/']);
    }
  }
}