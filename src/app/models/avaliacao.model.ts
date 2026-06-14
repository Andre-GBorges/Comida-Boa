export interface Avaliacao {
  id?: number;
  restauranteId: number;
  usuarioId: number;
  nomeUsuario: string;
  nota: number;
  comentario: string;
  data: string;
}