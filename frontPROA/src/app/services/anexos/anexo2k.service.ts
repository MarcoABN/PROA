import { Injectable } from '@angular/core';
import { FrontClienteService } from '../front-cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';
import { PDFDocument } from 'pdf-lib';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2KService {

  constructor(private clienteService: FrontClienteService, private maskcpf: ValidadorcpfcnpjService) { }
  mesextenso?: String;

  async anexo2K( embarcacao: Embarcacao, 
                 proprietarioAnterior: Cliente,
                 campotexto2: string, 
                 servico?: string): Promise<void | Uint8Array> {



    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2K-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');
      form.getTextField('cp-dl-ag').setText(campotexto2 ?? '');
      /*


        INVERTER LOGICA E RECUPERAR DADOS DO VENDEDOR VIA MODAL
        NÃO REQUERER CADASTRO DO VENDEDOR

        */
      // Proprietário ANTERIOR
      form.getTextField('nomeproprietarioanterior').setText(proprietarioAnterior.nome ?? '');
      form.getTextField('rg').setText(proprietarioAnterior.rg ?? '');
      form.getTextField('orgaoexpedidor').setText(proprietarioAnterior.orgEmissor ?? '');
      form.getTextField('dtexpedicao').setText(proprietarioAnterior.dtEmissao?.toString() ?? '');
      form.getTextField('cpfcnpj').setText(this.maskcpf.mascararCpfCnpj(proprietarioAnterior.cpfcnpj) ?? '');
      form.getTextField('endereco').setText(proprietarioAnterior.logradouro ?? '');
      form.getTextField('complemento').setText(proprietarioAnterior.complemento ?? '');
      form.getTextField('numero').setText(proprietarioAnterior.numero?.toString() ?? '');
      form.getTextField('bairro').setText(proprietarioAnterior.bairro ?? '');
      form.getTextField('cidade').setText(proprietarioAnterior.cidade ?? '');
      form.getTextField('uf').setText(proprietarioAnterior.uf ?? '');
      form.getTextField('cep').setText(proprietarioAnterior.cep ?? '');

      // NOVO Proprietário (cliente atual)
      form.getTextField('nomenovoproprietario').setText(embarcacao.cliente.nome ?? '');
      form.getTextField('rgnovoproprietario').setText(embarcacao.cliente.rg ?? '');
      form.getTextField('orgaoexpedidornovoproprietario').setText(embarcacao.cliente.orgEmissor ?? '');
      form.getTextField('dtexpedicaonovoproprietario').setText(embarcacao.cliente.dtEmissao?.toString() ?? '');
      form.getTextField('cpfcnpjnovoproprietario').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente.cpfcnpj) ?? '');
      form.getTextField('endereconovoproprietario').setText(embarcacao.cliente.logradouro ?? '');
      form.getTextField('numeronovoproprietario').setText(embarcacao.cliente.numero?.toString() ?? '');
      form.getTextField('complementonovoproprietario').setText(embarcacao.cliente.complemento ?? '');
      form.getTextField('bairronovoproprietario').setText(embarcacao.cliente.bairro ?? '');
      form.getTextField('cidadenovoproprietario').setText(embarcacao.cliente.cidade ?? '');
      form.getTextField('ufnovoproprietario').setText(embarcacao.cliente.uf ?? '');
      form.getTextField('cepnovoproprietario').setText(embarcacao.cliente.cep ?? '');


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

      form.getTextField('localdata').setText(embarcacao.cidade + ', ' + dia + ' de ' + this.mesextenso + ' de ' + ano);

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

}
