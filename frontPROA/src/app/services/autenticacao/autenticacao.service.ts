import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserLogin } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  baseUrl = 'http://localhost:3000';
  private userSubject = new BehaviorSubject<any>(null);
  user: any;
  error: any;

  constructor(private http: HttpClient, public auth: AngularFireAuth) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  async login(userLogin: UserLogin): Promise<any> {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(userLogin.email, userLogin.senha);
      this.user = credential.user;
      this.setUserSubject(this.user);
      return credential.user;
    } catch (error) {
      this.error = error;
      throw error; // Lança o erro para ser capturado pelo componente
    }
  }

  private setUserSubject(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user); // Corrige para userSubject
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getRoles() {
    return this.userSubject.getValue();
  }

  logout() {
    this.userSubject.next(null);
    localStorage.clear();
    this.auth.signOut();
  }
}
