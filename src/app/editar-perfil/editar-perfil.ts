import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios';
import { AutentificacaoService } from '../services/autentificacao';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfilComponent implements OnInit {
  form: FormGroup;
  usuarioId!: number;
  erroGeral: boolean = false;
  sucesso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      foto: [''],
      sobreVoce: ['']
    });
  }

  ngOnInit(): void {
    const usuario = this.autenticacaoService.usuarioAtual;

    // se ninguém estiver logado, manda pro login
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioId = usuario.id!;
    this.form.patchValue({
      nome: usuario.nome,
      foto: usuario.foto,
      sobreVoce: usuario.sobreVoce
    });
  }

  onSubmit(): void {
    this.erroGeral = false;
    this.sucesso = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // mantém senha e id, só atualiza os campos do formulário
    const dadosAtualizados = {
      ...this.autenticacaoService.usuarioAtual,
      ...this.form.value
    };

    this.usuariosService.update(this.usuarioId, dadosAtualizados).subscribe({
      next: (usuarioAtualizado) => {
        this.autenticacaoService.atualizarUsuarioLogado(usuarioAtualizado);
        this.sucesso = true;
      },
      error: () => this.erroGeral = true
    });
  }
}