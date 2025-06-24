import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2E212Service {
  mesextenso?: String;
  constructor(private datePipe: DatePipe, private maskcpf: ValidadorcpfcnpjService) { }

  async anexo2E212(embarcacao: Embarcacao, cpfVendedor: string, nomeVendedor: string, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo2E-N212.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const formattedDtEmissao = this.datePipe.transform((embarcacao.cliente.dtEmissao ?? ''), 'dd/MM/yyyy') || '';

      const form = pdfDoc.getForm();

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');

      form.getTextField('nomevendedor').setText(nomeVendedor ?? '');
      form.getTextField('cpfcnpjvendedor').setText(this.maskcpf.mascararCpfCnpj(cpfVendedor) ?? '');
      const valorFormatado = embarcacao.valor != null
        ? `R$ ${Number(embarcacao.valor).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        : 'R$ 0,00';

      form.getTextField('valor').setText(valorFormatado);

      form.getTextField('nome').setText(embarcacao.cliente?.nome ?? '');
      form.getTextField('rg').setText(embarcacao.cliente?.rg ?? '');
      form.getTextField('cpfcnpj').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente?.cpfcnpj) ?? '');

      const endereco =
        (embarcacao.cliente.logradouro ?? '') +
        ', ' + (embarcacao.cliente.numero ?? '') +
        ', ' + (embarcacao.cliente.complemento ?? '') +
        ', ' + (embarcacao.cliente.bairro ?? '') +
        ', ' + (embarcacao.cliente.cidade ?? '') +
        ', CEP: ' + (embarcacao.cliente.cep ?? '');
      const [part1, part2] = this.divideString(endereco, 75);
      form.getTextField('endereco1').setText(part1.toUpperCase());
      form.getTextField('endereco2').setText(part2.toUpperCase());

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

  divideString(input: string, limit: number): [string, string] {
    let part1 = '';
    let part2 = '';
    console.log("tamanho: ", input.length);
    if (input.length <= limit) {
      part1 = input;
    } else {
      let breakPoint = input.lastIndexOf(' ', limit);
      if (breakPoint === -1) {
        breakPoint = limit;
      }
      part1 = input.substring(0, breakPoint);
      part2 = input.substring(breakPoint).trim();
    }

    return [part1, part2];
  }



}
