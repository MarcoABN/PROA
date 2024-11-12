import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isMenuCollapsed = true;
  title = 'frontembarcacao';
  constructor(private authService: AutenticacaoService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login/login']);
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.isAuthenticated = !!user; // Converte o valor para booleano
    });
  }
}
