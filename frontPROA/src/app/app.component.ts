import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontembarcacao';
  isAuthenticated = false;
  isMenuCollapsed = true;

  constructor(private authService: AutenticacaoService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.isAuthenticated = !!user; // Converte o valor para booleano
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login/login']);
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
