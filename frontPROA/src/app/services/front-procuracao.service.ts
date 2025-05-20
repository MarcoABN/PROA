import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class FrontProcuracaoService {
  private apiUrl = `${AppConfig.API_BASE_URL}/procuracao`;

  constructor(private httpClient: HttpClient) { }

  procuracao01(idEmbarcacao: number): void {
    this.httpClient.get(`${this.apiUrl}/pdf/${idEmbarcacao}`, {
      responseType: 'blob'
    }).subscribe((pdfBlob: Blob) => {
      const file = new Blob([pdfBlob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL); // abre em nova aba
    }, error => {
      console.error('Erro ao gerar a procuração em PDF:', error);
    });
  }
}
0
