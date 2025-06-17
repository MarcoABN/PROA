import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2D212Service {
  mesextenso?: String;
  constructor(private datePipe: DatePipe, private maskcpf: ValidadorcpfcnpjService) { }

  async anexo2D212(embarcacao: Embarcacao, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo2D-N212.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const formattedDtEmissao = this.datePipe.transform((embarcacao.cliente.dtEmissao?? ''), 'dd/MM/yyyy') || '';

      const form = pdfDoc.getForm();

      form.getTextField('nome').setText(embarcacao.cliente?.nome ?? '');
      form.getTextField('rg').setText(embarcacao.cliente?.rg ?? '');
      form.getTextField('dtemissao').setText(formattedDtEmissao ?? '');
      form.getTextField('cpf1').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente?.cpfcnpj) ?? '');
      form.getTextField('telefone').setText(embarcacao.cliente?.telefone ?? '');
      form.getTextField('celular').setText(embarcacao.cliente?.celular ?? '');
      form.getTextField('nacionalidade').setText(embarcacao?.cliente?.nacionalidade ? embarcacao.cliente.nacionalidade.toUpperCase() : '');
      form.getTextField('naturalidade').setText(embarcacao?.cliente?.naturalidade ? embarcacao.cliente.naturalidade.toUpperCase() : '');
      form.getTextField('email').setText(embarcacao.cliente?.email ?? '');

      const valorConcatenado = 
      (embarcacao.nomeEmbarcacao ?? '') + 
      (embarcacao.numInscricao ? ', ' + embarcacao.numInscricao : '');
      form.getTextField('nomeinscricaoembarcacao').setText(valorConcatenado);

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();

      switch (mes) {
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
      if (!servico) {
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
