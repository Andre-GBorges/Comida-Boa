import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estrelas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estrelas.html',
  styleUrl: './estrelas.css'
})
export class EstrelasComponent {
  @Input() nota: number = 0;
  posicoes = [1, 2, 3, 4, 5];

  tipoIcone(posicao: number): string {
    if (posicao <= Math.floor(this.nota)) return 'bi-star-fill';
    const diferenca = posicao - this.nota;
    if (diferenca > 0 && diferenca < 1) return 'bi-star-half';
    return 'bi-star';
  }
}