import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { Motor } from 'src/app/model/motor';
import { FrontMotorService } from '../front-motor.service';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from '../front-cliente.service';
import { firstValueFrom } from 'rxjs';
import { ValidadorcpfcnpjService } from '../validacao/validadorcpfcnpj.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2MService {

  constructor(private motorService: FrontMotorService, private maskcpf: ValidadorcpfcnpjService) { }

  motores: Motor[] = [];
  qtdmotores!: number;


  async anexo2M(embarcacao: Embarcacao,
    campotexto1: string,
    campotexto2: string,
    campotexto3: string,
    opcao: string,
    servico?: string): Promise<void | Uint8Array> {


    try {

      await this.carregarDados(embarcacao);

      const pdfBytes = await fetch('assets/pdfanexos/Anexo2M-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();


      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao ?? '');
      form.getTextField('inscricao').setText(embarcacao.numInscricao ?? '');

      form.getTextField('cpfcnpjproprietario').setText(this.maskcpf.mascararCpfCnpj(campotexto1) ?? '');
      form.getTextField('nomeproprietario').setText(campotexto2 ?? '');
      form.getTextField('telefoneproprietario').setText(campotexto3 ?? '');
      form.getTextField('emailproprietario').setText(opcao ?? '');

      form.getTextField('nomecomprador').setText(embarcacao.cliente.nome ?? '');
      form.getTextField('cpfcnpjcomprador').setText(this.maskcpf.mascararCpfCnpj(embarcacao.cliente.cpfcnpj) ?? '');
      form.getTextField('telefone').setText(embarcacao.cliente.celular ?? '');
      form.getTextField('logradourocomprador').setText(embarcacao.cliente.logradouro ?? '');
      form.getTextField('bairrocomprador').setText(embarcacao.cliente.bairro ?? '');
      form.getTextField('cidadecomprador').setText(embarcacao.cliente.cidade ?? '');
      form.getTextField('numerocomprador').setText(embarcacao.cliente.numero?.toString() ?? '');
      form.getTextField('complementocomprador').setText(embarcacao.cliente.complemento ?? '');
      form.getTextField('cepcomprador').setText(embarcacao.cliente.cep ?? '');
      form.getTextField('emailcomprador').setText(embarcacao.cliente.email ?? '');

      const valorFormatado = embarcacao.valor != null
        ? `R$ ${Number(embarcacao.valor).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        : 'R$ 0,00';
      form.getTextField('valorcomprador').setText(valorFormatado);





      switch (this.qtdmotores) {
        case 1:
          form.getCheckBox('motor1_sim').check();
          form.getCheckBox('motor2_nao').check();
          form.getCheckBox('motor3_nao').check();
          form.getCheckBox('motor4_nao').check();
          break;
        case 2:
          form.getCheckBox('motor1_sim').check();
          form.getCheckBox('motor2_sim').check();
          form.getCheckBox('motor3_nao').check();
          form.getCheckBox('motor4_nao').check();
          break;
        case 3:
          form.getCheckBox('motor1_sim').check();
          form.getCheckBox('motor2_sim').check();
          form.getCheckBox('motor3_sim').check();
          form.getCheckBox('motor4_nao').check();
          break;
        case 4:
          form.getCheckBox('motor1_sim').check();
          form.getCheckBox('motor2_sim').check();
          form.getCheckBox('motor3_sim').check();
          form.getCheckBox('motor4_sim').check();
          break;
      };
      // Substitua todo o bloco 'if' dos motores por este loop
      for (let i = 0; i < this.qtdmotores && i < 4; i++) {
        const motorIndex = i + 1; // Para corresponder aos nomes dos campos (motor1, motor2...)
        const motor = this.motores[i];

        form.getTextField(`marcamotor${motorIndex}`).setText(motor?.marca ?? '');
        form.getTextField(`potenciamotor${motorIndex}`).setText(motor?.potencia?.toString() ?? '');
        form.getTextField(`numseriemotor${motorIndex}`).setText(motor?.numSerie ?? '');
      }

      // Lógica para marcar os checkboxes 'sim'/'nao'
      for (let i = 1; i <= 4; i++) {
        if (i <= this.qtdmotores) {
          form.getCheckBox(`motor${i}_sim`).check();
        } else {
          form.getCheckBox(`motor${i}_nao`).check();
        }
      }


      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); //Os meses são baseados em zero, então é necessário adicionar 1.
      const ano = hoje.getFullYear().toString();
      form.getTextField('localdata').setText((embarcacao.cidade ?? '') + ', ' + dia + '/' + mes + '/' + ano);




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
    // CRIA UMA CÓPIA SEGURA DO Uint8Array
    // Isso garante que o novo array seja baseado em um ArrayBuffer padrão, 
    // e não no SharedArrayBuffer original.
    const safeData = new Uint8Array(data);

    // Agora, o construtor do Blob recebe um tipo compatível
    const blob = new Blob([safeData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  async carregarDados(embarcacao: Embarcacao) {
    try {
      this.motores = await firstValueFrom(this.motorService.listarMotorPorEmbarcacao(embarcacao?.id ?? ''));
      this.qtdmotores = this.motores?.length ?? 0;
      console.log("QTD MOTORES: ", this.qtdmotores);
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`Nenhum motor encontrado para a embarcação com ID: ${embarcacao?.id ?? 'não definido'}`);
        this.motores = [];
        this.qtdmotores = 0;
      } else {
        console.error("Erro ao buscar motores:", error);
        throw error;
      }
    }
  }

}