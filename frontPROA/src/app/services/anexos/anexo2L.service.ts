import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';

@Injectable({
  providedIn: 'root'
})
export class Anexo2LService {

  constructor() { }

  async anexo2L (embarcacao?: Embarcacao, cliente?: Cliente, servico?: string): Promise<void | Uint8Array>{
    
    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2L-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();
  
      if (cliente){
      form.getTextField('nome').setText(cliente.nome);
      form.getTextField('nacionalidade').setText(cliente.nacionalidade.toUpperCase());
      form.getTextField('naturalidade').setText(cliente.naturalidade.toUpperCase());
      form.getTextField('cpf').setText(cliente.cpfcnpj);
      form.getTextField('telefone').setText(cliente.telefone);
      form.getTextField('celular').setText(cliente.celular);
      form.getTextField('email').setText(cliente.email);
      const endereco = 
        cliente.logradouro 
        + ', ' +cliente.complemento
        + ', ' +cliente.bairro
        + ', ' +cliente.cidade
        + ', CEP: ' +cliente.cep;
      const [part1, part2] = this.divideString(endereco, 35);
      form.getTextField('endereco1').setText(part1.toUpperCase());
      form.getTextField('endereco2').setText(part2.toUpperCase());
      } else if (embarcacao){
        form.getTextField('nome').setText(embarcacao.cliente.nome);
      form.getTextField('nacionalidade').setText(embarcacao.cliente.nacionalidade.toUpperCase());
      form.getTextField('naturalidade').setText(embarcacao.cliente.naturalidade.toUpperCase());
      form.getTextField('cpf').setText(embarcacao.cliente.cpfcnpj);
      form.getTextField('telefone').setText(embarcacao.cliente.telefone);
      form.getTextField('celular').setText(embarcacao.cliente.celular);
      form.getTextField('email').setText(embarcacao.cliente.email);
      const endereco = 
      embarcacao.cliente.logradouro 
        + ', ' +embarcacao.cliente.complemento
        + ', ' +embarcacao.cliente.bairro
        + ', ' +embarcacao.cliente.cidade
        + ', CEP: ' +embarcacao.cliente.cep;
      const [part1, part2] = this.divideString(endereco, 35);
      form.getTextField('endereco1').setText(part1.toUpperCase());
      form.getTextField('endereco2').setText(part2.toUpperCase());
      }

      

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('dia').setText(dia);
      form.getTextField('ano').setText(ano);
      form.getTextField('mes').setText(mes);


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
      //if (part2.length > limit) {
       // part2 = part2.substring(0, limit);
      //}
    }

    return [part1, part2];
  }
}
