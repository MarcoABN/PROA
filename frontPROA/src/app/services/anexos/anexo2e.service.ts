import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';

@Injectable({
  providedIn: 'root'
})
export class Anexo2EService {

  constructor(private datePipe: DatePipe) { }

  //Função para gerar o Anexo 2E. Se for uma solicitação única não é necessário o último parâmtro na chamada da função e o PDF será exibido diretamente.
  //Se for uma chamada do serviço é necessário passar algo como último parâmetro. Isso irá sinalizar que é um serviço e retornar o arquivo de forma dinâmica.
  async anexo2E (embarcacao: Embarcacao, solicitacao: string, campotexto1: string, campotexto2: string, campotexto3: string, servico?: string): Promise<void | Uint8Array>{

    try{
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2E-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm(); 

      
      switch (solicitacao){
        case "inscricao":
          form.getCheckBox('check_inscricao').check();
          break;
        case "cancelamento":
          form.getCheckBox('check_cancelamento').check();
          break;
        case "licencaconstrucao":
            form.getCheckBox('check_licencaconstrucao').check();
          break;
        case "licencaalteracao":
          form.getCheckBox('check_licencaalteracao').check();
        break;
        case "licencareclassificacao":
          form.getCheckBox('check_licencareclassificacao').check();
        break;
        case "transfpropriedade":
          form.getCheckBox('check_transfpropriedade').check();
        break;
        case "transfjurisdicao":
          form.getCheckBox('check_transfjurisdicao').check();
        break;
        case "transfpropjurisdicao":
          form.getCheckBox('check_transfpropjurisdicao').check();
        break;
        case "mudancanome":
          form.getCheckBox('check_mudancanome').check();
          form.getTextField('nomeembarcacao1').setText(campotexto1.toUpperCase());
          form.getTextField('nomeembarcacao2').setText(campotexto2.toUpperCase());
          form.getTextField('nomeembarcacao3').setText(campotexto3.toUpperCase());
        break;
        case "renovacaotie_sim":
          form.getCheckBox('check_renovacaotie').check();
          form.getCheckBox('check_renovacaotie_sim').check();
        break;
        case "renovacaotie_nao":
          form.getCheckBox('check_renovacaotie').check();
          form.getCheckBox('check_renovacaotie_nao').check();
        break;
        case "segviatie_perda":
          form.getCheckBox('check_segviatie').check();
          form.getCheckBox('check_segviatie_perda').check();
        break;
        case "segviatie_roubo":
          form.getCheckBox('check_segviatie').check();
          form.getCheckBox('check_segviatie_roubo').check();
        break;
        case "segviatie_extravio":
          form.getCheckBox('check_segviatie').check();
          form.getCheckBox('check_segviatie_extravio').check();
        break;
        case "segviatie_mauestado":
          form.getCheckBox('check_segviatie').check();
          form.getCheckBox('check_segviatie_mauestado').check();
        break;
        case "alteracaodadosembarcacao":
          form.getCheckBox('check_alteracaodadosembarcacao').check();
        break;
        case "alteracaodadosproprietario":
          form.getCheckBox('check_alteracaodadosproprietario').check();
        break;
        case "trocamotor":
          form.getCheckBox('check_trocamotor').check();
        break;
        case "certidaoembarcacao":
          form.getCheckBox('check_certidaoembarcacao').check();
        break;
        case "registroaverbacao":
          form.getCheckBox('check_registroaverbacao').check();
        break;
        case "cancaverbacao":
          form.getCheckBox('check_cancaverbacao').check();
        break;
        case "vistoriaarqueacao":
          form.getCheckBox('check_vistoriaarqueacao').check();
        break;
        case "vistoriarearqueacao":
          form.getCheckBox('check_vistoriarearqueacao').check();
        break;
        case "vistoriaclassificacao":
          form.getCheckBox('check_vistoriaclassificacao').check();
        break;
        case "outrosservicos":
          form.getCheckBox('check_outrosservicos').check();
          //form.getTextField('outrosservicos1').setText(campotexto1.toUpperCase());
          const [part1, part2] = this.divideString(campotexto1, 70);
          form.getTextField('outrosservicos1').setText(part1.toUpperCase());
          form.getTextField('outrosservicos2').setText(part2.toUpperCase());
        break;
      }

      

      


      form.getTextField('nome').setText(embarcacao.cliente.nome);
      form.getTextField('logradouro').setText(embarcacao.cliente.logradouro + ', ' + embarcacao.cliente.complemento);
      form.getTextField('numero').setText(embarcacao.cliente.numero);
      //form.getTextField('aptosala').setText(embarcacao.cliente.complemento);
      form.getTextField('cidade').setText(embarcacao.cliente.cidade);
      form.getTextField('uf').setText(embarcacao.cliente.uf);
      form.getTextField('rg').setText(embarcacao.cliente.rg);
      form.getTextField('orgexpedidor').setText(embarcacao.cliente.orgEmissor);
      form.getTextField('cep').setText(embarcacao.cliente.cep);
      form.getTextField('telefone').setText(embarcacao.cliente.telefone);
      form.getTextField('cpfcnpj').setText(embarcacao.cliente.cpfcnpj);

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('numinscricao').setText(embarcacao.numInscricao ?? '');
      form.getTextField('comprimento').setText(embarcacao.compTotal.toString()+"m");
      form.getTextField('numcasco').setText(embarcacao.numCasco);
      form.getTextField('classificacao').setText(embarcacao.tipoEmbarcacao);

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('localdata').setText(embarcacao.cidade + ', ' + dia + '/' + mes + '/' + ano);



      form.flatten();
      const modifiedPdfBytes = await pdfDoc.save();
      if (!servico){
        this.abrirPDFemJanela(modifiedPdfBytes);
        console.log('PDF Criado!');
      } else {
        return modifiedPdfBytes;
      }


    }catch (err) {
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
