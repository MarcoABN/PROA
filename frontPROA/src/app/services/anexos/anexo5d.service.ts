import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo5DService {
  mesextenso?: String;
  constructor(private datePipe: DatePipe, private maskcpf: ValidadorcpfcnpjService) { }

  async anexo5D(cliente: Cliente, solicitacao: string, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo5D-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const formattedDtEmissao = this.datePipe.transform((cliente.cha_dtemissao ?? ''), 'dd/MM/yyyy') || '';
      const formattedDtEmissao2 = this.datePipe.transform((cliente.dtEmissao ?? ''), 'dd/MM/yyyy') || '';

      const form = pdfDoc.getForm();

      form.getTextField('nome').setText(cliente.nome ?? '');
      form.getTextField('rg').setText(cliente.rg ?? '');
      form.getTextField('dtemissao').setText(formattedDtEmissao2 ?? '');
      form.getTextField('cpf1').setText(this.maskcpf.mascararCpfCnpj(cliente.cpfcnpj) ?? '');
      form.getTextField('celular').setText(cliente.celular ?? '');


      form.getTextField('logradouro').setText(cliente.logradouro ?? '');

      form.getTextField('complemento').setText(
        (cliente.numero ?? '') + ', ' + (cliente.complemento ?? '')
      );

      form.getTextField('bairro').setText(cliente.bairro ?? '');
      form.getTextField('cidade').setText(
        (cliente.cidade ?? '') + ', ' + (cliente.uf ?? '')
      );
      form.getTextField('cep').setText(cliente.cep ?? '');

      form.getTextField('cha').setText(cliente.cha_numero ?? '');
      form.getTextField('dtemissaocha').setText(formattedDtEmissao ?? '');
      form.getTextField('categoriacha').setText(cliente.cha_categoria ?? '');



      switch (solicitacao) {
        case "1":
          form.getCheckBox('extraviada').check();
          break;
        case "2":
          form.getCheckBox('roubada').check();
          break;
        case "3":
          form.getCheckBox('furtada').check();
          break;
        case "4":
          form.getCheckBox('danificada').check();
          break;
      }

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

      form.getTextField('localdata').setText(cliente.cidade + ', ' + dia + ' de ' + this.mesextenso + ' de ' + ano);

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
