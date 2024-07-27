import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Embarcacao } from 'src/app/model/embarcacao';
import { Motor } from 'src/app/model/motor';
import { FrontMotorService } from '../front-motor.service';

@Injectable({
  providedIn: 'root'
})
export class Anexo2MService {

  constructor(private motorService: FrontMotorService ) { }

  motores: Motor[] = [];
  qtdmotores!: number;
  
  
  async anexo2M (embarcacao: Embarcacao){

    this.motorService.listarMotorPorEmbarcacao(embarcacao.id).subscribe(motores => {
      this.motores = motores;
    });   
    this.qtdmotores = this.motores.length;
    console.log("QTD MOTORES: ", this.qtdmotores);
    

    try {
      const pdfBytes = await fetch('assets/pdfanexos/Anexo2M-N211.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();

      form.getTextField('nomeembarcacao').setText(embarcacao.nomeEmbarcacao);
      form.getTextField('inscricao').setText(embarcacao.numInscricao);
      form.getTextField('nomeproprietario').setText(embarcacao.cliente.nome);
      form.getTextField('cpfcnpjproprietario').setText(embarcacao.cliente.cpfcnpj);
      form.getTextField('telefoneproprietario').setText(embarcacao.cliente.telefone);
      form.getTextField('emailproprietario').setText(embarcacao.cliente.email);





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






      form.flatten();
      const modifiedPdfBytes = await pdfDoc.save();

      this.abrirPDFemJanela(modifiedPdfBytes);
      console.log('PDF Criado!');

    }catch (err){
      console.log(err);
    }

  }

  private abrirPDFemJanela(data: Uint8Array): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
