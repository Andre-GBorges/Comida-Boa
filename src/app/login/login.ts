import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form: FormGroup;
  erroLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutentificacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, senha } = this.form.value;
    this.autenticacaoService.login(nome, senha).subscribe(sucesso => {
      if (sucesso) {
        this.erroLogin = false;
        this.router.navigate(['/']);
      } else {
        this.erroLogin = true;
      }
    });
  }
}