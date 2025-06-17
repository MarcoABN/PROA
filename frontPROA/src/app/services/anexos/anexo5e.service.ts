import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Cliente } from 'src/app/model/cliente';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';
import { Escolanautica } from 'src/app/model/escolanautica';

@Injectable({
  providedIn: 'root'
})
export class Anexo5eService {

  constructor(private datePipe: DatePipe, private maskcpf: ValidadorcpfcnpjService) { }
  mesextenso?: String;

  async anexo5E(cliente: Cliente,
    escola: Escolanautica,
    dataAula: string,
    horasaula: string,
    servico?: string): Promise<void | Uint8Array> {
    // qtd horas, estabelecimento, dataaula
    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo5E-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const formattedDtEmissao2 = this.datePipe.transform((cliente.dtEmissao ?? ''), 'dd/MM/yyyy') || '';
      const formattedDtEmissao3 = this.datePipe.transform((escola.responsavel?.dtEmissao ?? ''), 'dd/MM/yyyy') || '';

      const form = pdfDoc.getForm();

      form.getTextField('qtdhoras').setText(horasaula ?? '');

      form.getTextField('nomecliente').setText(cliente.nome ?? '');
      form.getTextField('cpfcliente').setText(this.maskcpf.mascararCpfCnpj(cliente.cpfcnpj) ?? '');
      form.getTextField('estabelecimento').setText(escola.razaoSocial ?? '');
      form.getTextField('instrutor').setText(escola.instrutor?.nome ?? '');
      form.getTextField('nomeresponsavel').setText(escola.responsavel?.nome ?? '');
      form.getTextField('rgresponsavel').setText(escola.responsavel?.rg ?? '');
      form.getTextField('orgemresponsavel').setText(escola.responsavel?.orgEmissor ?? '');
      form.getTextField('dtemissaoresponsavel').setText(formattedDtEmissao3 ?? '');
      form.getTextField('cpfresponsavel').setText(
        this.maskcpf.mascararCpfCnpj(escola.responsavel?.cpfcnpj ?? '') //se não existir, passa string vazia
      );
      form.getTextField('charesponsavel').setText(escola.responsavel?.cha_numero ?? '');

      //dados do plano de treinamento

      form.getTextField('data').setText(this.formatarDataBrasileira(dataAula) ?? '');

      form.getTextField('nomeinstrutor').setText(escola.instrutor?.nome ?? '');
      form.getTextField('chainstrutor').setText(escola.instrutor?.cha_categoria ?? '');
      form.getTextField('numchainstrutor').setText(escola.instrutor?.cha_numero ?? '');

      form.getTextField('nomecliente2').setText(cliente.nome ?? '');
      form.getTextField('rgcliente').setText(cliente.rg ?? '');
      form.getTextField('orgemissorcliente').setText(cliente.orgEmissor ?? '');
      form.getTextField('dtemissaocliente').setText(formattedDtEmissao2 ?? '');
      form.getTextField('cpfcliente2').setText(this.maskcpf.mascararCpfCnpj(cliente.cpfcnpj) ?? '');





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

  formatarDataBrasileira(dataISO: string): string {
    if (!dataISO) return '';
    const partes = dataISO.split('-');
    if (partes.length !== 3) return dataISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

}

