import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserLogin } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  baseUrl = 'http://localhost:3000';
  private userSubject = new BehaviorSubject<any>(null);
  private usuarioLogadoSubject = new BehaviorSubject<boolean>(false); // Controle de login
  user: any;
  error: any;

  constructor(private http: HttpClient, public auth: AngularFireAuth) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
      this.usuarioLogadoSubject.next(true); // Define como logado ao recarregar a página
    }
  }

  async login(userLogin: UserLogin): Promise<any> {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(userLogin.email, userLogin.senha);
      this.user = credential.user;
      this.setUserSubject(this.user);
      this.usuarioLogadoSubject.next(true); // Atualiza o estado para logado
      return credential.user;
    } catch (error) {
      this.error = error;
      this.usuarioLogadoSubject.next(false);
      throw error; // Lança o erro para ser capturado pelo componente
    }
  }

  private setUserSubject(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    this.usuarioLogadoSubject.next(true); // Atualiza o estado do login
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getRoles(): any {
    return this.userSubject.getValue();
  }

  logout(): void {
    this.userSubject.next(null);
    this.usuarioLogadoSubject.next(false); // Define como deslogado
    localStorage.clear();
    this.auth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(email);
      alert('Um link para resetar sua senha foi enviado para seu e-mail.');
    } catch (error) {
      console.error('Erro ao tentar resetar a senha', error);
      alert('Erro ao tentar resetar a senha. Verifique se o e-mail está correto.');
      throw error;
    }
  }

  async register(userLogin: UserLogin): Promise<any> {
    try {
      const credential = await this.auth.createUserWithEmailAndPassword(userLogin.email, userLogin.senha);
      this.user = credential.user;
      this.setUserSubject(this.user);
      return credential.user;
    } catch (error) {
      this.error = error;
      throw error;
    }
  }

  // Getter para verificar se o usuário está logado
  isUsuarioLogado(): Observable<boolean> {
    return this.usuarioLogadoSubject.asObservable();
  }
}
