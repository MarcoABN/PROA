import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrgMilitar } from '../model/orgmilitar' // ajuste o caminho conforme sua estrutura de pastas

@Injectable({
  providedIn: 'root'
})
export class FrontOrgmilitarService {
  private baseUrl = 'http://localhost:8080/corgmilitar/orgmilitar'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para listar todas as OrgMilitar
  listar(): Observable<OrgMilitar[]> {
    return this.http.get<OrgMilitar[]>(this.baseUrl);
  }

  // Método para consultar uma OrgMilitar por ID
  consultar(id: number): Observable<OrgMilitar> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<OrgMilitar>(url);
  }

  // Método para inserir uma nova OrgMilitar
  inserir(orgMilitar: OrgMilitar): Observable<OrgMilitar> {
    return this.http.post<OrgMilitar>(this.baseUrl, orgMilitar, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Método para alterar uma OrgMilitar existente
  alterar(id: number, orgMilitar: OrgMilitar): Observable<OrgMilitar> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<OrgMilitar>(url, orgMilitar, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Método para excluir uma OrgMilitar por ID
  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
