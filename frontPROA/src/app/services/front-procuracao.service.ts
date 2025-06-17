import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontProcuracaoService {

  private apiUrl = `${AppConfig.API_SERVICE_URL}`;

  constructor(private httpClient: HttpClient) { }

  async gerarProcuracao(idCliente: number, servico?: string): Promise<void |Blob> {
  const body = { idCliente };
  try {
    const response = await lastValueFrom(this.httpClient.post(`${this.apiUrl}/procuracao/gerar`, body, {
      responseType: 'blob'
    }));
    if (!servico) {
        this.abrirPDFemJanela(response);
        console.log('PDF Criado!');
        return;
      } else {
        return response;
      }
  } catch (error) {
    console.error('Erro ao gerar a procuração em PDF:', error);
    throw error;
  }
}
private abrirPDFemJanela(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}
