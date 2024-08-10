import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  listarNotaFiscal(): Observable<Notafiscal[]> {
    return this.httpClient.get<Notafiscal[]>(`${this.url}`);
  }

  listarNotaFiscalPorEmbarcacao(idEmbarcacao: number): Observable<Notafiscal[]> {
    return this.httpClient.get<Notafiscal[]>(`${this.url2}/${idEmbarcacao}`);
  }

  consultarNotaFiscal(idNotaFiscal: number): Observable<Notafiscal> {
    return this.httpClient.get<Notafiscal>(`${this.url}/${idNotaFiscal}`);
  }

  incluirNotaFiscal(notaFiscal: Notafiscal): Observable<object> {
    return this.httpClient.post(`${this.url}`, notaFiscal);
  }

  alterarNotaFiscal(IDNotaFiscal: number, notaFiscal: Notafiscal): Observable<object> {
    return this.httpClient.put(`${this.url}/${IDNotaFiscal}`, notaFiscal);
  }

  excluirNotaFiscal(IDNotaFiscal: number): Observable<Object> {
    return this.httpClient.delete<Notafiscal>(`${this.url}/${IDNotaFiscal}`);
  }

  uploadNotaFiscalPDF(idNotaFiscal: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.url}/${idNotaFiscal}/upload`, formData);
  }

  excluirNotaFiscalPDF(idNotaFiscal: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${idNotaFiscal}/pdf`);
  }

  getNotaFiscalPDF(idNotaFiscal: number): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${idNotaFiscal}/pdf`, { responseType: 'blob' });
  }
}
