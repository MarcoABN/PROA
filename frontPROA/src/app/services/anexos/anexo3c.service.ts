import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';

@Injectable({
  providedIn: 'root'
})
export class Anexo3CService {

  constructor() { }

  async anexo3C (embarcacao: Embarcacao, campotexto2: string, servico?: string): Promise<void | Uint8Array>{

    try{
      const pdfBytes = await fetch('assets/pdfanexos/Anexo3C-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('nome').setText(embarcacao.cliente.nome);
      form.getTextField('nacionalidade').setText(embarcacao.cliente.nacionalidade.toUpperCase());

      let partesData = embarcacao.cliente.dataNasc.toString().split('-');
      form.getTextField('dianasc').setText(partesData[2]);
      form.getTextField('mesnasc').setText(partesData[1]);
      form.getTextField('anonasc').setText(partesData[0]);

      form.getTextField('rg').setText(embarcacao.cliente.rg);
      form.getTextField('orgexpedidor').setText(embarcacao.cliente.orgEmissor);

      let partesData2 = embarcacao.cliente.dtEmissao.toString().split('-');
      form.getTextField('diaexprg').setText(partesData2[2]);
      form.getTextField('mesexprg').setText(partesData2[1]);
      form.getTextField('anoexprg').setText(partesData2[0]);
      form.getTextField('cpf').setText(embarcacao.cliente.cpfcnpj);

      const endereco = embarcacao.cliente.logradouro + ', ' +embarcacao.cliente.complemento;
      const [part1, part2] = this.divideString(endereco, 28);
      form.getTextField('logradouro').setText(part1.toUpperCase());
      form.getTextField('logradouro2').setText(part2.toUpperCase());


      form.getTextField('logradouro').setText(endereco);

      form.getTextField('bairro').setText(embarcacao.cliente.bairro);
      form.getTextField('cep').setText(embarcacao.cliente.cep);
      form.getTextField('cidade_uf').setText(embarcacao.cliente.cidade + ' / ' + embarcacao.cliente.uf);
      form.getTextField('telefone').setText(embarcacao.cliente.telefone ? embarcacao.cliente.telefone : embarcacao.cliente.celular);

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('classificacaoembarcacao').setText(embarcacao.tipoEmbarcacao);
      //form.getTextField('capitania').setText(embarcacao.?); falta tratar capitania
      form.getTextField('numinscricaoembarcacao').setText(embarcacao.numInscricao);
      form.getTextField('cidade').setText(embarcacao.cidade);

      form.getTextField('capitania').setText(campotexto2);
      form.getTextField('capitania2').setText(campotexto2);
      
      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('dia').setText(dia);
      form.getTextField('ano').setText(ano);
     // form.getTextField('mesextenso').setText(mes);

      switch (mes){
        case '01':
          form.getTextField('mesextenso').setText('Janeiro');
          break;
        case '02':
          form.getTextField('mesextenso').setText('Fevereiro');
          break;
        case '03':
          form.getTextField('mesextenso').setText('Março');
          break;
        case '04':
          form.getTextField('mesextenso').setText('Abril');
          break;
        case '05':
          form.getTextField('mesextenso').setText('Maio');
          break;
        case '06':
          form.getTextField('mesextenso').setText('Junho');
          break;
        case '07':
          form.getTextField('mesextenso').setText('Julho');
          break;
        case '08':
          form.getTextField('mesextenso').setText('Agosto');
          break;
        case '09':
          form.getTextField('mesextenso').setText('Setembro');
          break;
        case '10':
          form.getTextField('mesextenso').setText('Outubro');
          break;
        case '11':
          form.getTextField('mesextenso').setText('Novembro');
          break;
        case '12':
          form.getTextField('mesextenso').setText('Dezembro');
          break;
      }

      


      form.flatten();
      const modifiedPdfBytes = await pdfDoc.save();
      if (!servico){
        this.abrirPDFemJanela(modifiedPdfBytes);
        console.log('PDF Criado!');
      } else {
        return modifiedPdfBytes;
      }
    }catch (err){
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
    console.log("tamanho: ", input.length)
    if (input.length <= limit) {
      part1 = input;
    } else {
      let breakPoint = input.lastIndexOf(' ', limit);
      if (breakPoint === -1) {
        breakPoint = limit; // Nenhum espaço encontrado, quebra no limite
      }
      part1 = input.substring(0, breakPoint);
      
      part2 = input.substring(breakPoint).trim();
      if (part2.length > limit) {
        part2 = part2.substring(0, limit);
      }
    }

    return [part1, part2];
  }

}
