import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestador } from '../model/prestador';

@Injectable({
  providedIn: 'root'
})
export class FrontPrestadorService {
  private url = 'http://localhost:8080/cprestador/prestador'; 

  constructor(private httpClient: HttpClient) { }

  listarPrestador(): Observable<Prestador[]>{
    return this.httpClient.get<Prestador[]>(`${this.url}`)
  }

  //Serviço para consulta da prestador
  consultarPrestador (idPrestador: number): Observable<Prestador>{
    
    return this.httpClient.get<Prestador>(`${this.url}/${idPrestador}`)
  }


  incluirPrestador(prestador: Prestador): Observable<object>{
    return this.httpClient.post(`${this.url}`, prestador);
  }


  alterarPrestador(IDPrestador: number, prestador: Prestador): Observable<object>{
    return this.httpClient.put(`${this.url}/${IDPrestador}`, prestador);
  }


  excluirPrestador(IDPrestador: number): Observable<Object>{
    return this.httpClient.delete<Prestador>(`${this.url}/${IDPrestador}`);
  }

}
