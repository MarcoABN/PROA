import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from '../../model/embarcacao';
import { Cliente } from 'src/app/model/cliente';
import { DatePipe } from '@angular/common';
import { Motor } from 'src/app/model/motor';
import { FrontMotorService } from '../front-motor.service';
import { Notafiscal } from 'src/app/model/notafiscal';
import { FrontNotafiscalService } from '../front-notafiscal.service';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Anexo2BService {
  //motores: Motor[] = [];
  notaFiscal!: Notafiscal;

  constructor(private datePipe: DatePipe, private motorService: FrontMotorService, private notaFiscalService: FrontNotafiscalService, private maskcpf: ValidadorcpfcnpjService) { }

    //Função para gerar o Anexo 2B. Se for uma solicitação única não é necessário o último parâmtro na chamada da função e o PDF será exibido diretamente.
  //Se for uma chamada do serviço-anexo é necessário passar algo no último parâmetro. Isso irá sinalizar que é um serviço e retornar o arquivo de forma dinâmica.
  async anexo2B(embarcacao: Embarcacao, cliente: Cliente, natureza: string, servico?: string): Promise<void | Uint8Array> {

    const motores = await lastValueFrom(this.motorService.listarMotorPorEmbarcacao(embarcacao.id));

    this.notaFiscalService.listarNotaFiscalPorEmbarcacao(embarcacao.id).subscribe(notasFiscais => {
      this.notaFiscal = notasFiscais[0];
    });

    console.log(embarcacao.tipoEmbarcacao);

    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2B-N212.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      //Formatação das datas:
      const formattedDtConstrucao = this.datePipe.transform((embarcacao.dtConstrucao?? ''), 'dd/MM/yyyy') || '';
      const formattedDtEmissao = this.datePipe.transform((cliente.dtEmissao?? ''), 'dd/MM/yyyy') || '';


      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');
      form.getTextField('anoconstrucao').setText(formattedDtConstrucao ?? '');
      form.getTextField('passageiros').setText(embarcacao.lotacao?.toString() ?? '');
      form.getTextField('numcasco').setText(embarcacao.numCasco ?? '');
      form.getTextField('comprimento').setText(embarcacao.compTotal ? embarcacao.compTotal.toString()+"m" : '');
      
      if (natureza === 'Inscrição') {
        form.getCheckBox('check_inscricao').check();
      } else if (natureza === 'Cancelamento') {
        form.getCheckBox('check_cancelamento').check();
      } else if (natureza === 'Transf. Propriedade') {
        form.getCheckBox('check_transfproprietario').check();
      } else if (natureza === 'Transf. Jurisdição') {
        form.getCheckBox('check_transfjurisdicao').check();
      } else if (natureza === 'Atualização de Dados') {
        form.getCheckBox('check_atualizacaodados').check();
      };

      form.getTextField('nomeproprietario').setText(cliente.nome ?? '');
      form.getTextField('endereco').setText(`${cliente.logradouro}, ${cliente.numero} - ${cliente.complemento}`);
      form.getTextField('cidade').setText(cliente.cidade ?? '');
      form.getTextField('bairro').setText(cliente.bairro ?? '');
      form.getTextField('cep').setText(cliente.cep ?? '');
      form.getTextField('rg').setText(cliente.rg ?? '');
      form.getTextField('orgemissor').setText(cliente.orgEmissor ?? '');
      form.getTextField('dtemissao').setText(formattedDtEmissao ?? '');
      form.getTextField('cpfcnpj').setText(this.maskcpf.mascararCpfCnpj(cliente.cpfcnpj) ?? '');
      form.getTextField('telefone').setText(cliente.telefone ?? '');
      form.getTextField('celular').setText(cliente.celular ?? '');
      form.getTextField('email').setText(cliente.email ?? '');

      motores.slice(0, 3).forEach((motor, i) => {
        const idx = i + 1;
        form.getTextField(`marcamotor${idx}`).setText(motor.marca?.toString() ?? '');
        form.getTextField(`potmotor${idx}`).setText(motor.potencia?.toString() ?? '');
        form.getTextField(`numseriemotor${idx}`).setText(motor.numSerie?.toString() ?? '');
      });
      
      if (this.notaFiscal) {
        const formattedDtvenda = this.datePipe.transform(this.notaFiscal.dtVenda, 'dd/MM/yyyy') || '';
        form.getTextField('numnota').setText(this.notaFiscal.numeroNotaFiscal.toString()?? '');
        form.getTextField('dtvenda').setText(formattedDtvenda);
        form.getTextField('local').setText(this.notaFiscal.local.toString()?? '');
        form.getTextField('vendedor').setText(this.notaFiscal.razaoSocial.toString()?? '');
        form.getTextField('cpfcnpj_vendedor').setText(this.maskcpf.mascararCpfCnpj(this.notaFiscal.cnpjvendedor.toString())?? '');
      }

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