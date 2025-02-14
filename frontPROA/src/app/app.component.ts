import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false; // Propriedade usada para verificar autenticação
  isMenuCollapsed = true;
  title = 'frontembarcacao';

  constructor(private authService: AutenticacaoService, private router: Router) {}

  ngOnInit(): void {
    // Verifica o usuário ao iniciar a aplicação
    this.authService.getUser().subscribe(user => {
      this.isAuthenticated = !!user; // Converte a resposta para um booleano
    });

    // Se não houver usuário salvo, força o logout
    if (!localStorage.getItem('user')) {
      this.isAuthenticated = false;
      this.router.navigate(['/login/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login/login']);
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
