import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontEmailService {
  private apiUrl = 'http://localhost:8080/api/email'; // Ajuste o endereço conforme necessário

  constructor(private http: HttpClient) {}

  async enviarPDFsPorEmail(
    destinatario: string,
    assunto: string,
    mensagem: string,
    ...pdfs: Uint8Array[]
  ): Promise<void> {
    const formData = new FormData();
    formData.append('destinatario', destinatario);
    formData.append('assunto', assunto);
    formData.append('mensagem', mensagem);

    // Adiciona PDFs se houver
    pdfs.forEach((pdfBytes, index) => {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      formData.append('anexos', new File([blob], `anexo-${index + 1}.pdf`));
    });

    try {
      // Determina a URL do endpoint com base na presença de anexos
      const endpoint = pdfs.length ? `${this.apiUrl}/anexos` : `${this.apiUrl}/enviar`;

      // Envia o e-mail, com ou sem anexos
      await this.http.post<string>(endpoint, formData, {
        responseType: 'text' as 'json'
      }).toPromise();

      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Não foi possível enviar o email.');
    }
  }
}
