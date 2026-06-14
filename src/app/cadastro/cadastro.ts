import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios';
import { AutentificacaoService } from '../services/autentificacao';

// Validador de grupo: compara os campos "senha" e "confirmarSenha"
function senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
  const senha = group.get('senha')?.value;
  const confirmarSenha = group.get('confirmarSenha')?.value;
  return senha === confirmarSenha ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  form: FormGroup;
  usuarioJaExiste: boolean = false;
  erroGeral: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, { validators: senhasIguaisValidator });
  }

  onSubmit(): void {
    this.usuarioJaExiste = false;
    this.erroGeral = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, senha } = this.form.value;

    // 1. Verifica se já existe um usuário com esse nome
    this.usuariosService.getByNome(nome).subscribe(usuarios => {
      if (usuarios.length > 0) {
        this.usuarioJaExiste = true;
        return;
      }

      // 2. Cria o usuário
      this.usuariosService.create({ nome, senha, foto: '', sobreVoce: '' }).subscribe({
        next: () => {
          // 3. Já loga automaticamente e manda pra editar perfil
          this.autenticacaoService.login(nome, senha).subscribe(() => {
            this.router.navigate(['/editar-perfil']);
          });
        },
        error: () => this.erroGeral = true
      });
    });
  }
}