import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2LService {

  constructor(private maskcpf: ValidadorcpfcnpjService) {}

  async anexo2L(cliente?: Cliente, servico?: string): Promise<void | Uint8Array> {
    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2L-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      if (cliente) {
        form.getTextField('nome').setText(cliente.nome ?? '');
        form.getTextField('nacionalidade').setText((cliente.nacionalidade ?? '').toUpperCase());
        form.getTextField('naturalidade').setText((cliente.naturalidade ?? '').toUpperCase());
        form.getTextField('cpf').setText(this.maskcpf.mascararCpfCnpj(cliente.cpfcnpj) ?? '');
        form.getTextField('telefone').setText(cliente.telefone ?? '');
        form.getTextField('celular').setText(cliente.celular ?? '');
        form.getTextField('email').setText(cliente.email ?? '');

        const endereco =
          (cliente.logradouro ?? '') +
          ', ' + (cliente.numero ?? '') +
          ', ' + (cliente.complemento ?? '') +
          ', ' + (cliente.bairro ?? '') +
          ', ' + (cliente.cidade ?? '') +
          ', CEP: ' + (cliente.cep ?? '');
        const [part1, part2] = this.divideString(endereco, 100);
        form.getTextField('endereco1').setText(part1.toUpperCase());
        form.getTextField('endereco2').setText(part2.toUpperCase());

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
      const ano = hoje.getFullYear().toString();
      form.getTextField('localdata').setText((cliente.cidade ?? '') + ', ' + dia + '/' + mes + '/' + ano);

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
      console.log(err);
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
