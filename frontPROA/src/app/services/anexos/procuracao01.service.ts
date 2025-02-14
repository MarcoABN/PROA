import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Embarcacao } from 'src/app/model/embarcacao';
import { Prestador } from 'src/app/model/prestador';
import { FrontPrestadorService } from '../front-prestador.service';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Procuracao } from 'src/app/model/procuracao';
import { FrontProcuracaoService } from '../front-procuracao.service';



@Injectable({
  providedIn: 'root'
}) 
export class Procuracao01Service {

  prestadores: Prestador[] = [];

  stringProcuracao?: string;

  constructor(private datePipe: DatePipe, private prestadorService: FrontPrestadorService, private procuracaoService: FrontProcuracaoService) { }


  async procuracao01 (embarcacao: Embarcacao, cliente: Cliente, servico?: string): Promise<void | Uint8Array>{
    
    this.prestadorService.listarPrestador().subscribe(prestadores => {
      this.prestadores = prestadores;
    });

    this.procuracaoService.consultarProcuracao("procuracao01").subscribe((procuracao: any) => {
      this.stringProcuracao = procuracao.textoProcuracao;
    });
    
    

    


    try{
      const pdfBytes = await fetch('assets/pdfanexos/Procuracao_modelo01.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);


      const form = pdfDoc.getForm();



      this.substituirCampos({
        nome_cliente: embarcacao.cliente.nome,
        nacionalidade_cliente: embarcacao.cliente.nacionalidade,
        endereco_cliente: embarcacao.cliente.logradouro + ", " +
                          embarcacao.cliente.numero + ", " +
                          embarcacao.cliente.complemento,
        cidade_cliente: embarcacao.cliente.cidade,
        estado_cliente: embarcacao.cliente.uf,
        identidade_cliente: embarcacao.cliente.rg,
        orgao_exp: embarcacao.cliente.orgEmissor,
        cpf_cliente: embarcacao.cliente.cpfcnpj,
      });

      form.getTextField('corpocompleto').setText(this.stringProcuracao);
      

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('tipo').setText(embarcacao.tipoEmbarcacao);
      form.getTextField('comprimento').setText(embarcacao.compTotal.toString());
      form.getTextField('boca').setText(embarcacao.bocaMoldada.toString());
      form.getTextField('numcasco').setText(embarcacao.numCasco);
      form.getTextField('potencia').setText(embarcacao.potenciaMotor.toString());
      form.getTextField('inscricao').setText(embarcacao.numInscricao);
      form.getTextField('atividade').setText(embarcacao.tipoAtividade);
      form.getTextField('tripulantes').setText(embarcacao.qtdTripulantes.toString());
      form.getTextField('passageiros').setText(embarcacao.lotacao.toString());
      form.getTextField('materialcasco').setText(embarcacao.matCasco);
      form.getTextField('numserie').setText(embarcacao.numCasco);

      form.getTextField('nomecliente').setText(embarcacao.cliente.nome);
      form.getTextField('cpf').setText(this.formatarCPFouCNPJ(embarcacao.cliente.cpfcnpj));

      const dataAtual = new Date();
      const dia = dataAtual.getDate().toString().padStart(2, '0');
      const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
      const ano = dataAtual.getFullYear();

      form.getTextField('localdata').setText(`${embarcacao.cliente.cidade} ${dia}/${mes}/${ano}`);

      //form.flatten();
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

  formatarCPFouCNPJ(valor: string): string {
    // Remove todos os caracteres não numéricos
    const valorLimpo = valor.replace(/\D/g, '');
  
    if (valorLimpo.length === 11) {
      // Formata como CPF
      return valorLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 'CPF: $1.$2.$3-$4');
    } else if (valorLimpo.length === 14) {
      // Formata como CNPJ
      return valorLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, 'CNPJ: $1.$2.$3/$4-$5');
    } else {
      // Retorna o valor original se não for CPF nem CNPJ válido
      return valor;
    }
  }

  substituirCampos(campoValores: Record<string, string>): void {
    // Percorrer o mapa de campos e valores para substituir todos os placeholders
    for (const [campo, valor] of Object.entries(campoValores)) {
      const regex = new RegExp(`{{${campo}}}`, 'g');
      this.stringProcuracao = this.stringProcuracao!.replace(regex, valor);
    }
  }

  gerarPdf() {

    this.procuracaoService.alterarTextoEConverterParaPdf(this.stringProcuracao!).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        console.error('Erro ao gerar o PDF', error);
      }
    );
  }

  

}
