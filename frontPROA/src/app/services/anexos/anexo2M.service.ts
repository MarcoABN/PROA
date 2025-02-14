import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { Motor } from 'src/app/model/motor';
import { FrontMotorService } from '../front-motor.service';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from '../front-cliente.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2MService {

  constructor(private motorService: FrontMotorService, private clienteService: FrontClienteService ) { }

  cliente!: Cliente;
  motores: Motor[] = [];
  qtdmotores!: number;
  
  
  async anexo2M (embarcacao: Embarcacao, campotexto1: string, campotexto2: string, servico?: string): Promise<void | Uint8Array>{


    try {

      await this.carregarDados(embarcacao, campotexto1);

      const pdfBytes = await fetch('assets/pdfanexos/Anexo2M-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('inscricao').setText(embarcacao.numInscricao);
      form.getTextField('nomeproprietario').setText(embarcacao.cliente.nome);
      form.getTextField('cpfcnpjproprietario').setText(embarcacao.cliente.cpfcnpj);
      form.getTextField('telefoneproprietario').setText(embarcacao.cliente.telefone);
      form.getTextField('emailproprietario').setText(embarcacao.cliente.email);

      form.getTextField('nomecomprador').setText(this.cliente.nome);
      form.getTextField('cpfcnpjcomprador').setText(this.cliente.cpfcnpj);
      form.getTextField('telefone').setText(this.cliente.celular);
      form.getTextField('logradourocomprador').setText(this.cliente.logradouro);
      form.getTextField('bairrocomprador').setText(this.cliente.bairro);
      form.getTextField('cidadecomprador').setText(this.cliente.cidade);
      form.getTextField('numerocomprador').setText(this.cliente.numero);
      form.getTextField('complementocomprador').setText(this.cliente.complemento);
      form.getTextField('cepcomprador').setText(this.cliente.cep);
      form.getTextField('emailcomprador').setText(this.cliente.email);
      form.getTextField('valorcomprador').setText("R$ " + campotexto2);
      //form.getTextField('localdata').setText(this.cliente.nome);
      





      switch (this.qtdmotores){
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
      if (this.qtdmotores >= 1){
        form.getTextField('marcamotor1').setText(this.motores[0].marca);
        form.getTextField('potenciamotor1').setText(this.motores[0].potencia.toString());
        form.getTextField('numseriemotor1').setText(this.motores[0].numSerie);
      };
      if (this.qtdmotores >= 2){
        form.getTextField('marcamotor2').setText(this.motores[1].marca);
        form.getTextField('potenciamotor2').setText(this.motores[1].potencia.toString());
        form.getTextField('numseriemotor2').setText(this.motores[1].numSerie);
      };
      if (this.qtdmotores >= 3){
        form.getTextField('marcamotor3').setText(this.motores[2].marca);
        form.getTextField('potenciamotor3').setText(this.motores[2].potencia.toString());
        form.getTextField('numseriemotor3').setText(this.motores[2].numSerie);
      }
      if (this.qtdmotores >= 4){
        form.getTextField('marcamotor4').setText(this.motores[3].marca);
        form.getTextField('potenciamotor4').setText(this.motores[3].potencia.toString());
        form.getTextField('numseriemotor4').setText(this.motores[3].numSerie);
      };


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
    }catch (err){
      console.log(err);
    }

  }

  private abrirPDFemJanela(data: Uint8Array): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  async carregarDados (embarcacao: Embarcacao, campotexto1: string){
    this.motorService.listarMotorPorEmbarcacao(embarcacao.id).subscribe(motores => {
      this.motores = motores;
    });   
    this.qtdmotores = this.motores.length;
    console.log("QTD MOTORES: ", this.qtdmotores);
    
    this.clienteService.consultarClienteCPFCNPJ(campotexto1).subscribe(cliente => {
      this.cliente = cliente;
    });
  }
}
