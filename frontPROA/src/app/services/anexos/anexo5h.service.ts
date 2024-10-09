import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';

@Injectable({
  providedIn: 'root'
})
export class Anexo5HService {
  texto: string[] = [];
  constructor(private datePipe: DatePipe) { }

  async anexo5H(solicitacao: string, campotexto1: string, embarcacao?: Embarcacao, cliente?: Cliente, servico?: string): Promise<void | Uint8Array> {

    try {

      const pdfBytes = await fetch('assets/pdfanexos/Anexo5H-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      const solicitacoes = solicitacao.split(',');
      solicitacoes.forEach(valor => {
        switch (valor.trim()) {
          case "1":
            form.getCheckBox('servico1').check();
            break;
          case "2":
            form.getCheckBox('servico2').check();
            break;
          case "3":
            form.getCheckBox('servico3').check();
            break;
          case "4":
            form.getCheckBox('servico4').check();
            break;
          case "5":
            form.getCheckBox('servico5').check();
            break;
          case "6":
            form.getCheckBox('servico6').check();
            break;
          case "7":
            form.getCheckBox('servico7').check();
            break;
          case "8":
            form.getCheckBox('servico8').check();
            break;
          case "9":
            form.getCheckBox('servico9').check();
            break;
          case "10a":
            form.getCheckBox('servico10').check();
            form.getCheckBox('servico10_a').check();
            break;
          case "10b":
            form.getCheckBox('servico10').check();
            form.getCheckBox('servico10_b').check();
            break;
          case "10c":
            form.getCheckBox('servico10').check();
            form.getCheckBox('servico10_c').check();
            break;
          case "11":
            form.getCheckBox('servico11').check();
            break;
          case "12":
            form.getCheckBox('servico12').check();
            break;
          default:
            console.log(`Solicitação ${valor} não reconhecida.`);
        }
      });

      if (embarcacao) {
        form.getTextField('nome').setText(embarcacao.cliente.nome);
        form.getTextField('cpf1').setText(embarcacao.cliente.cpfcnpj);
        form.getTextField('cpf2').setText(embarcacao.cliente.cpfcnpj);
        form.getTextField('rg').setText(embarcacao.cliente.rg);
        form.getTextField('orgexpedidor').setText(embarcacao.cliente.orgEmissor);
        form.getTextField('logradouro').setText(embarcacao.cliente.logradouro);
        form.getTextField('numero').setText(embarcacao.cliente.numero);
        form.getTextField('complemento').setText(embarcacao.cliente.complemento);
        form.getTextField('bairro').setText(embarcacao.cliente.bairro);
        form.getTextField('cidade').setText(embarcacao.cliente.cidade);
        form.getTextField('uf').setText(embarcacao.cliente.uf);
        form.getTextField('cep').setText(embarcacao.cliente.cep);
        form.getTextField('dddtelefone').setText(embarcacao.cliente.telefone.substring(0, 2));
        form.getTextField('telefone').setText(embarcacao.cliente.telefone.substring(2));
        form.getTextField('dddcelular').setText(embarcacao.cliente.celular.substring(0, 2));
        form.getTextField('celular').setText(embarcacao.cliente.celular.substring(2));
        form.getTextField('email').setText(embarcacao.cliente.email);
        form.getTextField('local').setText(embarcacao.cliente.cidade);
      } else if (cliente) {
        form.getTextField('nome').setText(cliente.nome);
        form.getTextField('cpf1').setText(cliente.cpfcnpj);
        form.getTextField('cpf2').setText(cliente.cpfcnpj);
        form.getTextField('rg').setText(cliente.rg);
        form.getTextField('orgexpedidor').setText(cliente.orgEmissor);
        form.getTextField('logradouro').setText(cliente.logradouro);
        form.getTextField('numero').setText(cliente.numero);
        form.getTextField('complemento').setText(cliente.complemento);
        form.getTextField('bairro').setText(cliente.bairro);
        form.getTextField('cidade').setText(cliente.cidade);
        form.getTextField('uf').setText(cliente.uf);
        form.getTextField('cep').setText(cliente.cep);
        form.getTextField('dddtelefone').setText(cliente.telefone.substring(0, 2));
        form.getTextField('telefone').setText(cliente.telefone.substring(2));
        form.getTextField('dddcelular').setText(cliente.celular.substring(0, 2));
        form.getTextField('celular').setText(cliente.celular.substring(2));
        form.getTextField('email').setText(cliente.email);
        form.getTextField('local').setText(cliente.cidade);
      }

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('dia').setText(dia);
      form.getTextField('mes').setText(mes);
      form.getTextField('ano').setText(ano);

      console.log(campotexto1);

      this.texto = this.divideString(campotexto1);
      form.getTextField('descricao1').setText(this.texto[0]);
      form.getTextField('descricao2').setText(this.texto[1]);
      form.getTextField('descricao3').setText(this.texto[2]);
      form.getTextField('descricao4').setText(this.texto[3]);
      form.getTextField('descricao5').setText(this.texto[4]);
      form.getTextField('descricao6').setText(this.texto[5]);
      form.getTextField('descricao7').setText(this.texto[6]);







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

  divideString(texto: string): string[] {
    const limiteDescricao1 = 60;
    const limiteOutros = 80;
    const result: string[] = [];

    // Função auxiliar para dividir um trecho de texto com limite de caracteres sem quebrar palavras
    function dividirPorLimite(texto: string, limite: number): string[] {
      const partes: string[] = [];
      let parteAtual = '';

      texto.split(' ').forEach(palavra => {
        if ((parteAtual + palavra).length <= limite) {
          parteAtual += (parteAtual ? ' ' : '') + palavra;
        } else {
          partes.push(parteAtual);
          parteAtual = palavra;
        }
      });

      if (parteAtual) {
        partes.push(parteAtual);
      }

      return partes;
    }

    // Divide o texto inicial para preencher 'descricao1'
    let restante = texto;
    if (restante.length > limiteDescricao1) {
      const partesDescricao1 = dividirPorLimite(restante, limiteDescricao1);
      result.push(partesDescricao1[0]);
      restante = restante.substring(partesDescricao1[0].length).trim();
    } else {
      result.push(restante);
      restante = '';
    }

    // Divide o texto restante para preencher os demais campos
    const partesOutras = dividirPorLimite(restante, limiteOutros);
    result.push(...partesOutras);

    // Completa o array resultante com strings vazias, se necessário, para ter 7 elementos
    while (result.length < 7) {
      result.push('');
    }

    return result.slice(0, 7);
  }



}
