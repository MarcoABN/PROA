import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class JuntaAnexoService {

  constructor() { }

  async juntarPDFs(...pdfs: Uint8Array[]): Promise<void> {
    if (pdfs.length < 1 || pdfs.length > 5) {
      throw new Error('É necessário fornecer entre 1 e 5 arquivos PDF.');
    }

    //Cria um novo documento PDF vazio
    const docUnido = await PDFDocument.create();

    for (const pdfBytes of pdfs) {
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const numPages = pdfDoc.getPageCount();
      for (let i = 0; i < numPages; i++) {
        const [pagina] = await docUnido.copyPages(pdfDoc, [i]);
        docUnido.addPage(pagina);
      }
    }

    //Exporta o PDF combinado como Uint8Array
    const pdfFinal = await docUnido.save();

    //Cria um Blob a partir do Uint8Array gerado
    const blob = new Blob([pdfFinal], { type: 'application/pdf' });

    //Cria uma URL temporária para o Blob
    const url = URL.createObjectURL(blob);

    //Abre o PDF gerado em uma nova aba do navegador
    window.open(url, '_blank');
  }
}
