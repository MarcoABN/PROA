//private url = `${AppConfig.API_BASE_URL}/procuracao`; //'http://3.214.105.13:8080/cprocuracao';  

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../config/app-config';


export interface ProcuracaoRequestDTO {
  idEmbarcacao: number; // ID da embarcação para a qual será gerada a procuração
}

export enum DocumentoFormato {
  DOCX = 'docx',
  PDF = 'pdf'
}

@Injectable({
  providedIn: 'root'
})
export class ProcuracaoService {
  private apiUrl = `${AppConfig.API_BASE_URL}/procuracao`;

  constructor(private http: HttpClient) { }

  /**
   * Gera uma procuração para a embarcação especificada e abre o documento em uma nova aba
   * 
   * @param request Objeto contendo o ID da embarcação
   * @param formato Formato do documento (DOCX ou PDF)
   * @returns Observable do arquivo binário da procuração
   */
  gerarProcuracao(request: ProcuracaoRequestDTO, formato: DocumentoFormato = DocumentoFormato.PDF): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({
      'Accept': formato === DocumentoFormato.PDF ? 'application/pdf' : 'application/octet-stream'
    });

    const endpoint = formato === DocumentoFormato.PDF ? 'gerar-pdf' : 'gerar';
    const contentType = formato === DocumentoFormato.PDF 
      ? 'application/pdf' 
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const fileExtension = formato === DocumentoFormato.PDF ? 'pdf' : 'docx';

    return this.http.post(`${this.apiUrl}/${endpoint}`, request, {
      headers: headers,
      responseType: 'arraybuffer'
    }).pipe(
      tap((response: ArrayBuffer) => {
        // Cria um blob com o conteúdo do documento
        const blob = new Blob([response], { type: contentType });
        
        // Cria uma URL para o blob
        const url = window.URL.createObjectURL(blob);
        
        // Abre uma nova aba com o documento
        const newWindow = window.open(url, '_blank');
        
        // Se o navegador bloqueou o popup, fornece instrução alternativa
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          console.warn('O navegador bloqueou a abertura da nova aba. Tentando download direto.');
          this.downloadDocumento(blob, fileExtension);
        }
        
        // Libera a URL do objeto quando não for mais necessária
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      })
    );
  }

  /**
   * Força o download do documento caso a abertura em nova aba falhe
   * 
   * @param blob O blob contendo o documento
   * @param extensao Extensão do arquivo (pdf ou docx)
   */
  private downloadDocumento(blob: Blob, extensao: string): void {
    // Cria elemento de link para download
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    
    // Configura o link
    a.href = url;
    a.download = `procuracao.${extensao}`;
    
    // Adiciona ao DOM, clica e remove
    document.body.appendChild(a);
    a.click();
    
    // Remove do DOM
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}