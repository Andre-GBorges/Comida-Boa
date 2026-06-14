import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UsuariosService } from './usuarios';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class AutentificacaoService {

  private usuarioLogadoSubject: BehaviorSubject<Usuario | null>;
  public usuarioLogado$: Observable<Usuario | null>;

  constructor(private usuariosService: UsuariosService) {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    this.usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(
      usuarioSalvo ? JSON.parse(usuarioSalvo) : null
    );
    this.usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
  }

  get usuarioAtual(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  isLogado(): boolean {
    return this.usuarioLogadoSubject.value !== null;
  }

  login(nome: string, senha: string): Observable<boolean> {
    return this.usuariosService.getByNome(nome).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.senha === senha);
        if (usuario) {
          this.usuarioLogadoSubject.next(usuario);
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.usuarioLogadoSubject.next(null);
    localStorage.removeItem('usuarioLogado');
  }

  atualizarUsuarioLogado(usuario: Usuario): void {
    this.usuarioLogadoSubject.next(usuario);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }
}