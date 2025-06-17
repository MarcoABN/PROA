import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { Escolanautica } from '../model/escolanautica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontEscolanauticaService {

  constructor(private httpClient: HttpClient) { }

  private url = `${AppConfig.API_BASE_URL}/cescolanautica`;

  listarEscolaNautica(): Observable<Escolanautica[]> {
    return this.httpClient.get<Escolanautica[]>(`${this.url}`)
  }

  incluirEscolaNautica(escolaNautica: Escolanautica): Observable<object> {
    return this.httpClient.post(`${this.url}`, escolaNautica);
  }


  alterarEscolaNautica(IDEscolaNautica: number, escolaNautica: Escolanautica): Observable<object> {
    return this.httpClient.put(`${this.url}/${IDEscolaNautica}`, escolaNautica);
  }


  excluirEscolaNautica(IDEscolaNautica: number): Observable<Object> {
    return this.httpClient.delete<Escolanautica>(`${this.url}/${IDEscolaNautica}`);
  }
}
