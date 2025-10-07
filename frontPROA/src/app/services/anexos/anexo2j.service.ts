import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2JService {
  mesextenso?: String;
  constructor(private datePipe: DatePipe, private maskcpf: ValidadorcpfcnpjService) { }

  async anexo2J(embarcacao: Embarcacao, solicitacao: string, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo2J-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const formattedDtEmissao = this.datePipe.transform((embarcacao.cliente.dtEmissao ?? ''), 'dd/MM/yyyy') || '';

      const form = pdfDoc.getForm();

      form.getTextField('nome').setText(embarcacao.cliente?.nome ?? '');
      form.getTextField('rg').setText(embarcacao.cliente?.rg ?? '');
      form.getTextField('dtemissao').setText(formattedDtEmissao ?? '');
      form.getTextField('cpf1').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente.cpfcnpj) ?? '');
      form.getTextField('telefone').setText(embarcacao.cliente?.telefone ?? '');
      form.getTextField('celular').setText(embarcacao.cliente?.celular ?? '');
      form.getTextField('nacionalidade').setText(embarcacao?.cliente?.nacionalidade ? embarcacao.cliente.nacionalidade : '');
      form.getTextField('naturalidade').setText(embarcacao?.cliente?.naturalidade ? embarcacao.cliente.naturalidade : '');
      form.getTextField('email').setText(embarcacao.cliente?.email ?? '');

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');

      switch (solicitacao) {
        case "tie":
          form.getCheckBox('check_tie').check();
          break;
        case "tiem":
          form.getCheckBox('check_tiem').check();
          break;
      }


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
    // CRIA UMA CÓPIA SEGURA DO Uint8Array
    // Isso garante que o novo array seja baseado em um ArrayBuffer padrão, 
    // e não no SharedArrayBuffer original.
    const safeData = new Uint8Array(data);

    // Agora, o construtor do Blob recebe um tipo compatível
    const blob = new Blob([safeData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }



}
