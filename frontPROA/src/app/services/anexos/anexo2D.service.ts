import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from '../../model/embarcacao';
import { Cliente } from 'src/app/model/cliente';
import { DatePipe } from '@angular/common';
import { Motor } from 'src/app/model/motor';
import { FrontMotorService } from '../front-motor.service';
import { Notafiscal } from 'src/app/model/notafiscal';
import { FrontNotafiscalService } from '../front-notafiscal.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {
  motores: Motor[] = [];
  notaFiscal!: Notafiscal;

  constructor(private datePipe: DatePipe, private motorService: FrontMotorService, private notaFiscalService: FrontNotafiscalService) { }

    //Função para gerar o Anexo 2D. Se for uma solicitação única não é necessário o último parâmtro na chamada da função e o PDF será exibido diretamente.
  //Se for uma chamada do serviço-anexo é necessário passar algo no último parâmetro. Isso irá sinalizar que é um serviço e retornar o arquivo de forma dinâmica.
  async anexo2D(embarcacao: Embarcacao, cliente: Cliente, natureza: string, servico?: string): Promise<void | Uint8Array> {
    
    const motores = await lastValueFrom(this.motorService.listarMotorPorEmbarcacao(embarcacao.id));
      const notasFiscais = await lastValueFrom(this.notaFiscalService.listarNotaFiscalPorEmbarcacao(embarcacao.id));
      const notaFiscal = notasFiscais[0];

    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2D-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      //Formatação das datas:
      const formattedDtConstrucao = this.datePipe.transform((embarcacao.dtConstrucao?? ''), 'dd/MM/yyyy') || '';
      const formattedDtEmissao = this.datePipe.transform((cliente.dtEmissao?? ''), 'dd/MM/yyyy') || '';


      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');
      form.getTextField('tipo').setText(embarcacao.tipoEmbarcacao ?? '');
      form.getTextField('atividade').setText(embarcacao.tipoAtividade ?? '');
      
      form.getTextField('tripulantes').setText(embarcacao.qtdTripulantes.toString() ?? '');
      form.getTextField('anoconstrucao').setText(formattedDtConstrucao ?? '');
      
      form.getTextField('passageiros').setText(embarcacao.lotacao.toString() ?? '');
      form.getTextField('numcasco').setText(embarcacao.numCasco ?? '');
      
      form.getTextField('matcasco').setText(embarcacao.matCasco ?? '');

      //Medidas
      form.getTextField('comprimento').setText(embarcacao.compTotal ? embarcacao.compTotal.toString() : '');

      form.getTextField('arqbruta').setText(embarcacao.arqueacaoBruta ? embarcacao.arqueacaoBruta.toString() : '');
      form.getTextField('arqliquida').setText(embarcacao.arqueacaoLiquida ? embarcacao.arqueacaoLiquida.toString() : '');
      form.getTextField('boca').setText(embarcacao.bocaMoldada ? embarcacao.bocaMoldada.toString() : '');
      form.getTextField('contorno').setText(embarcacao.contorno ? embarcacao.contorno.toString() : '');
      form.getTextField('pontal').setText(embarcacao.pontalMoldado ? embarcacao.pontalMoldado.toString() : '');



      //Medidas

      
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
      } else if (natureza === 'Emissão de Certidão') {
        form.getCheckBox('check_emissaocertidao').check();
      };

      form.getTextField('nomeproprietario').setText(cliente.nome ?? '');
      form.getTextField('endereco').setText(`${cliente.logradouro?? ''}, ${cliente.numero?? ''} - ${cliente.complemento?? ''}`);
      form.getTextField('cidade').setText(cliente.cidade ?? '');
      form.getTextField('bairro').setText(cliente.bairro ?? '');
      form.getTextField('cep').setText(cliente.cep ?? '');
      form.getTextField('rg').setText(cliente.rg ?? '');
      form.getTextField('orgemissor').setText(cliente.orgEmissor ?? '');
      form.getTextField('dtemissao').setText(formattedDtEmissao ?? '');
      form.getTextField('cpfcnpj').setText(cliente.cpfcnpj ?? '');
      form.getTextField('telefone').setText(cliente.telefone ?? '');
      form.getTextField('celular').setText(cliente.celular ?? '');
      form.getTextField('email').setText(cliente.email ?? '');

      motores.slice(0, 3).forEach((motor, i) => {
        const idx = i + 1;
        form.getTextField(`marcamotor${idx}`).setText(motor.marca?.toString() ?? '');
        form.getTextField(`potmotor${idx}`).setText(motor.potencia?.toString() ?? '');
        form.getTextField(`numseriemotor${idx}`).setText(motor.numSerie?.toString() ?? '');
      });

      if (notaFiscal) {
        const formattedDtvenda = this.datePipe.transform((notaFiscal.dtVenda?? ''), 'dd/MM/yyyy') || '';
        form.getTextField('numnota').setText(notaFiscal.numeroNotaFiscal?.toString() ?? '');
        form.getTextField('dtvenda').setText(formattedDtvenda?? '');
        form.getTextField('local').setText(notaFiscal.local?.toString() ?? '');
        form.getTextField('vendedor').setText(notaFiscal.razaoSocial?.toString() ?? '');
        form.getTextField('cpfcnpj_vendedor').setText(notaFiscal.cnpjvendedor?.toString() ?? '');
      }

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('localdata').setText((embarcacao.cidade?? '') + ', ' + dia + '/' + mes + '/' + ano);
      

      


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

  private abrirPDFemJanela(data: Uint8Array): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}
