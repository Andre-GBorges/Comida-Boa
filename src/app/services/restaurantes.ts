import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {
  private apiUrl = 'http://localhost:3000/restaurantes';

  constructor(private http: HttpClient) {}

  // Lista todos, com filtros opcionais de pesquisa por nome e/ou tipo
  getAll(nome?: string, tipo?: string): Observable<Restaurante[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome_like', nome);
    }
    if (tipo) {
      params = params.set('tipo', tipo);
    }
    return this.http.get<Restaurante[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  }

  create(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.post<Restaurante>(this.apiUrl, restaurante);
  }

  update(id: number, restaurante: Restaurante): Observable<Restaurante> {
    return this.http.put<Restaurante>(`${this.apiUrl}/${id}`, restaurante);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}