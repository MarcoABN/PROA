import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notafiscal } from '../model/notafiscal';

@Injectable({
  providedIn: 'root'
})
export class FrontNotafiscalService {
 
  
  private url = "http://localhost:8080/cnotafiscal/notafiscal";
  private url2 = "http://localhost:8080/cnotafiscal/embarcacao";

  constructor(private httpClient: HttpClient) { }

  //Listar Embarcacoes a partir do metodo API REST que tem na URL acima
  listarNotaFiscal(): Observable<Notafiscal[]>{
    return this.httpClient.get<Notafiscal[]>(`${this.url}`)
  }

  listarNotaFiscalPorEmbarcacao(idEmbarcacao: number): Observable<Notafiscal[]>{
    return this.httpClient.get<Notafiscal[]>(`${this.url2}/${idEmbarcacao}`)
  }

  //Serviço para consulta da NotaFiscal
  consultarNotaFiscal (idNotaFiscal: number): Observable<Notafiscal>{
    
    return this.httpClient.get<Notafiscal>(`${this.url}/${idNotaFiscal}`)
  }

  //Servico para incluir uma NotaFiscal
  incluirNotaFiscal(notaFiscal: Notafiscal): Observable<object>{
    return this.httpClient.post(`${this.url}`, notaFiscal);
  }

  //Servico para Alterar uma NotaFiscal
  alterarNotaFiscal(IDNotaFiscal: number, notaFiscal: Notafiscal): Observable<object>{
    return this.httpClient.put(`${this.url}/${IDNotaFiscal}`, notaFiscal);
  }

  //Servico para Excluir uma NotaFiscal
  excluirNotaFiscal(IDNotaFiscal: number): Observable<Object>{
    return this.httpClient.delete<Notafiscal>(`${this.url}/${IDNotaFiscal}`);
  }
}
