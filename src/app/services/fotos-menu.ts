import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FotoMenu } from '../models/foto-menu.model';

@Injectable({
  providedIn: 'root'
})
export class FotosMenuService {
  private apiUrl = 'http://localhost:3000/fotosMenu';

  constructor(private http: HttpClient) {}

  getByRestaurante(restauranteId: number): Observable<FotoMenu[]> {
    const params = new HttpParams().set('restauranteId', restauranteId);
    return this.http.get<FotoMenu[]>(this.apiUrl, { params });
  }

  create(fotoMenu: FotoMenu): Observable<FotoMenu> {
    return this.http.post<FotoMenu>(this.apiUrl, fotoMenu);
  }
}