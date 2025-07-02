import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { Embarcacao } from '../model/embarcacao';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class VencimentoService {
  
  private readonly apiUrl = `${AppConfig.API_BASE_URL}/cvencimento`;

  constructor(private http: HttpClient) { }

  /**
   * Busca vencimentos CHA por período
   * @param dataInicio Data de início do período
   * @param dataFim Data de fim do período
   * @returns Observable com lista de clientes
   */
  buscarVencimentoCha(dataInicio: string, dataFim: string): Observable<Cliente[]> {
    const params = { dataInicio, dataFim };
    return this.http.get<Cliente[]>(`${this.apiUrl}/vencimento-cha`, { params });
  }

  /**
   * Busca vencimentos TIE por período
   * @param dataInicio Data de início do período
   * @param dataFim Data de fim do período
   * @returns Observable com lista de embarcações
   */
  buscarVencimentoTie(dataInicio: string, dataFim: string): Observable<Embarcacao[]> {
    const params = { dataInicio, dataFim };
    return this.http.get<Embarcacao[]>(`${this.apiUrl}/vencimento-tie`, { params });
  }

  /**
   * Busca vencimentos de Seguro por período
   * @param dataInicio Data de início do período
   * @param dataFim Data de fim do período
   * @returns Observable com lista de embarcações
   */
  buscarVencimentoSeguro(dataInicio: string, dataFim: string): Observable<Embarcacao[]> {
    const params = { dataInicio, dataFim };
    return this.http.get<Embarcacao[]>(`${this.apiUrl}/vencimento-seguro`, { params });
  }
}