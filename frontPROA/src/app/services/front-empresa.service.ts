import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontEmpresaService {

  constructor(private httpClient: HttpClient) { }

  private url = "http://3.214.105.13:8080/cempresa/empresa";

  listarEmpresa(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(`${this.url}`)
  }

  consultarEmpresa(IDEmpresa: number): Observable<Empresa>{
    return this.httpClient.get<Empresa>(`${this.url}/${IDEmpresa}`);
  }

  //Servico para incluir uma Empresa
  cadastrarEmpresa(barco: Empresa): Observable<object>{
    return this.httpClient.post(`${this.url}`, barco);
  }

  //Servico para Alterar uma Empresa
  alterarEmpresa(IDEmpresa: number, barco: Empresa): Observable<Object>{
        return this.httpClient.put(`${this.url}/${IDEmpresa}`, barco);
  }
}
