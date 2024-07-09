import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../services/autenticacao/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  formLogin!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private authService: AutenticacaoService,
              private router: Router) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (!this.formLogin.valid) {
      return;
    }

    this.authService.login(this.formLogin.getRawValue())
      .then(resposta => {
        this.router.navigate(['/inicio']);
      })
      .catch(error => {
        console.error('Erro ao tentar fazer o login', error);
        alert('Erro ao tentar fazer o login');
      });
  }
}
