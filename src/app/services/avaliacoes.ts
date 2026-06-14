import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {
  private apiUrl = 'http://localhost:3000/avaliacoes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(this.apiUrl);
  }

  // Todas as avaliações de um restaurante (usado na tela do restaurante)
  getByRestaurante(restauranteId: number): Observable<Avaliacao[]> {
    const params = new HttpParams().set('restauranteId', restauranteId);
    return this.http.get<Avaliacao[]>(this.apiUrl, { params });
  }

  // As N avaliações mais recentes de um restaurante (usado nos cards da home)
  getRecentesByRestaurante(restauranteId: number, limite: number = 2): Observable<Avaliacao[]> {
    const params = new HttpParams()
      .set('restauranteId', restauranteId)
      .set('_sort', 'data')
      .set('_order', 'desc')
      .set('_limit', limite);
    return this.http.get<Avaliacao[]>(this.apiUrl, { params });
  }

  // Todas as avaliações de um usuário (usado no histórico do usuário)
  getByUsuario(usuarioId: number): Observable<Avaliacao[]> {
    const params = new HttpParams().set('usuarioId', usuarioId);
    return this.http.get<Avaliacao[]>(this.apiUrl, { params });
  }

  create(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}