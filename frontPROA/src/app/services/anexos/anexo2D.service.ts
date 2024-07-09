import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from '../../model/embarcacao';
import { Cliente } from 'src/app/model/cliente';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor() {}

  

  async anexo2D(embarcacao: Embarcacao, cliente: Cliente, natureza: string): Promise<void> {
    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2D-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Modify doc, fill out the form
      const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());
      console.log({ fieldNames });

      const form = pdfDoc.getForm();

      //const formattedDate = this.datePipe.transform(embarcacao.dtConstrucao.toString(), 'dd-MM-yyyy');

      //form.getTextField('nomeDoCampoNoPDF').setText(Objeto+campo Em String);
      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('inscricao').setText(embarcacao.numInscricao);
      form.getTextField('arqbruta').setText(embarcacao.arqueacaoBruta.toString());
      form.getTextField('tipo').setText(embarcacao.tipoEmbarcacao);
      form.getTextField('atividade').setText(embarcacao.tipoAtividade);
      form.getTextField('arqliquida').setText(embarcacao.arqueacaoLiquida.toString());
      form.getTextField('comprimento').setText(embarcacao.compTotal.toString());
      form.getTextField('tripulantes').setText(embarcacao.qtdTripulantes.toString());
      form.getTextField('anoconstrucao').setText(embarcacao.dtConstrucao.toString());
      form.getTextField('boca').setText(embarcacao.bocaMoldada.toString());
      form.getTextField('passageiros').setText(embarcacao.lotacao.toString());
      form.getTextField('numcasco').setText(embarcacao.numCasco);
      form.getTextField('contorno').setText(embarcacao.contorno.toString());
      form.getTextField('pontal').setText(embarcacao.pontalMoldado.toString());
      form.getTextField('matcasco').setText(embarcacao.matCasco);
           
      if (natureza === 'Inscrição'){
        form.getCheckBox('check_inscricao').check();
      }else if (natureza === 'Cancelamento'){
        form.getCheckBox('check_cancelamento').check();
      }else if (natureza === 'Transf. Propriedade'){
        form.getCheckBox('check_transfproprietario').check();
      }else if (natureza === 'Transf. Jurisdição'){
        form.getCheckBox('check_transfjurisdicao').check();
      }else if (natureza === 'Atualização de Dados'){
        form.getCheckBox('check_atualizacaodados').check();
      }else if (natureza === 'Emissão de Certidão'){
        form.getCheckBox('check_emissaocertidao').check();
      };

      form.getTextField('nomeproprietario').setText(cliente.nome);
      form.getTextField('endereco').setText(`${cliente.logradouro}, ${cliente.numero} - ${cliente.complemento}`);
      form.getTextField('cidade').setText(cliente.cidade);
      form.getTextField('bairro').setText(cliente.bairro);      
      form.getTextField('cep').setText(cliente.cep);
      form.getTextField('rg').setText(cliente.rg);
      form.getTextField('orgemissor').setText(cliente.orgEmissor);
      form.getTextField('dtemissao').setText(cliente.dtEmissao.toString());
      form.getTextField('cpfcnpj').setText(cliente.cpfcnpj);
      form.getTextField('telefone').setText(cliente.telefone);
      form.getTextField('celular').setText(cliente.celular);
      form.getTextField('email').setText(cliente.email);
    
      form.flatten();
      const modifiedPdfBytes = await pdfDoc.save();
        //Chamada para função: Exibir ou baixar o PDF
      this.openPdfInNewTab(modifiedPdfBytes);
      //this.downloadPdf(modifiedPdfBytes, 'output.pdf');

      console.log('PDF Criado!');
    } catch (err) {
      console.error(err);
    }
  }

  private downloadPdf(data: Uint8Array, filename: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private openPdfInNewTab(data: Uint8Array): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
