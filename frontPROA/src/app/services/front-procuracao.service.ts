import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procuracao } from '../model/procuracao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontProcuracaoService {
  private url = 'http://3.214.105.13:8080/cprocuracao';  

  constructor(private httpClient: HttpClient) { }


  listarProcuracao(): Observable<Procuracao[]>{
    return this.httpClient.get<Procuracao[]>(`${this.url}`)
  }

  //Serviço para consulta da Procuracao
  consultarProcuracao (modeloProcuracao: string): Observable<Procuracao>{
    
    return this.httpClient.get<Procuracao>(`${this.url}/modelo/${modeloProcuracao}`)
  }


  incluirProcuracao(procuracao: Procuracao): Observable<object>{
    return this.httpClient.post(`${this.url}`, procuracao);
  }


  alterarProcuracao(IDProcuracao: number, procuracao: Procuracao): Observable<object>{
    return this.httpClient.put(`${this.url}/${IDProcuracao}`, procuracao);
  }


  excluirProcuracao(IDProcuracao: number): Observable<Object>{
    return this.httpClient.delete<Procuracao>(`${this.url}/${IDProcuracao}`);
  }

  obterProcuracao(): Observable<Procuracao> {
    return this.httpClient.get<Procuracao>(`${this.url}`);
  }

  salvarProcuracao(procuracao: Procuracao): Observable<void> {
    return this.httpClient.post<void>(`${this.url}`, procuracao);
  }

  alterarTextoEConverterParaPdf(novoTexto: string) {
    return this.httpClient.post(`${this.url}/alterar-para-pdf`, novoTexto, {
      responseType: 'arraybuffer', // Necessário para lidar com o PDF como Uint8Array
    });
  }
}
