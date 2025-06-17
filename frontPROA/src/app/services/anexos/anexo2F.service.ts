import { Injectable } from '@angular/core';
import { FrontClienteService } from '../front-cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';
import { PDFDocument } from 'pdf-lib';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2FService {

  constructor(private clienteService: FrontClienteService, private maskcpf: ValidadorcpfcnpjService) { }

  
  async anexo2F(embarcacao: Embarcacao, clienteNovo: Cliente, campotexto2: string, servico?: string): Promise<void | Uint8Array> {


    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2F-N212.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('nomemotoaquatica').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');
      form.getTextField('cp-dl-ag').setText(campotexto2 ?? '');

      form.getTextField('nomeproprietarioanterior').setText(embarcacao.cliente.nome ?? '');
      form.getTextField('rg').setText(embarcacao.cliente.rg ?? '');
      form.getTextField('orgaoexpedidor').setText(embarcacao.cliente.orgEmissor ?? '');
      form.getTextField('dtexpedicao').setText(embarcacao.cliente.dtEmissao?.toString() ?? '');
      form.getTextField('cpfcnpj').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente.cpfcnpj) ?? '');
      form.getTextField('endereco').setText(embarcacao.cliente.logradouro ?? '');
      form.getTextField('complemento').setText(embarcacao.cliente.complemento ?? '');
      form.getTextField('numero').setText(embarcacao.cliente.numero?.toString() ?? '');
      form.getTextField('bairro').setText(embarcacao.cliente.bairro ?? '');
      form.getTextField('cidade').setText(embarcacao.cliente.cidade ?? '');
      form.getTextField('uf').setText(embarcacao.cliente.uf ?? '');
      form.getTextField('cep').setText(embarcacao.cliente.cep ?? '');

      form.getTextField('nomenovoproprietario').setText(clienteNovo.nome ?? '');
      form.getTextField('rgnovoproprietario').setText(clienteNovo.rg ?? '');
      form.getTextField('orgaoexpedidornovoproprietario').setText(clienteNovo.orgEmissor ?? '');
      form.getTextField('dtexpedicaonovoproprietario').setText(clienteNovo.dtEmissao?.toString() ?? '');
      form.getTextField('cpfcnpjnovoproprietario').setText(this.maskcpf.mascararCpfCnpj(clienteNovo.cpfcnpj) ?? '');
      form.getTextField('endereconovoproprietario').setText(clienteNovo.logradouro ?? '');
      form.getTextField('numeronovoproprietario').setText(clienteNovo.numero?.toString() ?? '');
      form.getTextField('complementonovoproprietario').setText(clienteNovo.complemento ?? '');
      form.getTextField('bairronovoproprietario').setText(clienteNovo.bairro ?? '');
      form.getTextField('cidadenovoproprietario').setText(clienteNovo.cidade ?? '');
      form.getTextField('ufnovoproprietario').setText(clienteNovo.uf ?? '');
      form.getTextField('cepnovoproprietario').setText(clienteNovo.cep ?? '');

      form.getTextField('local').setText(clienteNovo.cidade ?? '');

      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
      const ano = hoje.getFullYear().toString();

      form.getTextField('dia').setText(dia);
      form.getTextField('ano').setText(ano.slice(-2));

      switch (mes) {
        case '01': form.getTextField('mes').setText('Janeiro'); break;
        case '02': form.getTextField('mes').setText('Fevereiro'); break;
        case '03': form.getTextField('mes').setText('Março'); break;
        case '04': form.getTextField('mes').setText('Abril'); break;
        case '05': form.getTextField('mes').setText('Maio'); break;
        case '06': form.getTextField('mes').setText('Junho'); break;
        case '07': form.getTextField('mes').setText('Julho'); break;
        case '08': form.getTextField('mes').setText('Agosto'); break;
        case '09': form.getTextField('mes').setText('Setembro'); break;
        case '10': form.getTextField('mes').setText('Outubro'); break;
        case '11': form.getTextField('mes').setText('Novembro'); break;
        case '12': form.getTextField('mes').setText('Dezembro'); break;
      }

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
