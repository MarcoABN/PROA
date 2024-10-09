import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';

@Injectable({
  providedIn: 'root'
})
export class Anexo3DService {
  mesextenso?: String;
  constructor() { }

  async anexo3D(orgMilitar: string, construtor: string, opcao: string, embarcacao: Embarcacao, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo3D-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('orgmilitar').setText(orgMilitar.toUpperCase());
      form.getTextField('nomeconstrutor').setText(construtor.toUpperCase());
      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('construida_alterada').setText(opcao.toUpperCase());
      form.getTextField('construida_alterada2').setText(opcao.toUpperCase());
      form.getTextField('comprimentototal').setText(embarcacao.compTotal.toString());
      form.getTextField('comprimentoperpend').setText(embarcacao.compPerpendicular.toString());
      form.getTextField('bocamoldada').setText(embarcacao.bocaMoldada.toString());
      form.getTextField('pontalmoldado').setText(embarcacao.pontalMoldado.toString());
      form.getTextField('areanavegacao').setText(embarcacao.areaNavegacao);

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();

      switch (mes){
        case '01':
           this.mesextenso = 'Janeiro';
          break;
        case '02':
          this.mesextenso = 'Fevereiro';
          break;
        case '03':
          this.mesextenso = 'Março';
          break;
        case '04':
          this.mesextenso = 'Abril';
          break;
        case '05':
          this.mesextenso = 'Maio';
          break;
        case '06':
          this.mesextenso = 'Junho';
          break;
        case '07':
          this.mesextenso = 'Julho';
          break;
        case '08':
          this.mesextenso = 'Agosto';
          break;
        case '09':
          this.mesextenso = 'Setembro';
          break;
        case '10':
          this.mesextenso = 'Outubro';
          break;
        case '11':
          this.mesextenso = 'Novembro';
          break;
        case '12':
          this.mesextenso = 'Dezembro';
          break;
      }
      
      form.getTextField('localdata').setText(embarcacao.cidade + ', ' + dia + ' de ' + this.mesextenso + ' de ' + ano);
 



      form.flatten();
      const modifiedPdfBytes = await pdfDoc.save();
      if (!servico){
        this.abrirPDFemJanela(modifiedPdfBytes);
        console.log('PDF Criado!');
      } else {
        return modifiedPdfBytes;
      }
    } catch (err) {
      console.error(err);
    }
  }

  private abrirPDFemJanela(data: Uint8Array): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}
