import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Embarcacao } from '../model/embarcacao';
import { Cliente } from '../model/cliente';
import { AnexosService } from '../services/anexos/anexo2D.service';
import { Anexo2EService } from '../services/anexos/anexo2e.service';
import { Anexo5HService } from '../services/anexos/anexo5h.service';
import { Anexo3CService } from '../services/anexos/anexo3c.service';
import { Anexo2LService } from '../services/anexos/anexo2L.service';
import { Anexo2MService } from '../services/anexos/anexo2M.service';
import { Anexo3DService } from '../services/anexos/anexo3D.service';
import { Anexo3AService } from '../services/anexos/anexo3A.service';
import { Anexo2FService } from '../services/anexos/anexo2F.service';
import { FrontClienteService } from '../services/front-cliente.service';
import { FrontEmbarcacaoService } from '../services/front-embarcacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontEmailService } from '../services/front-email.service';
import { PDFDocument } from 'pdf-lib';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-servico-anexo',
  templateUrl: './servico-anexo.component.html',
  styleUrls: ['./servico-anexo.component.css']
})
export class ServicoAnexoComponent {
  @ViewChild('clienteInput') clienteInput!: ElementRef;
  idEmbarcacao!: number;
  embarcacoes: Embarcacao[] = [];
  cpfcnpjCliente!: string;
  embarcacao!: Embarcacao;
  cliente!: Cliente;
  nomeCliente: string = '';
  natureza!: string;
  opcao: string = '';
  campotexto1: string = '';
  campotexto2: string = '';
  campotexto3: string = '';
  charCount: number = 0;
  modalAnexo2M: any;
  selecao!: number;


  constructor(
    private anexosService: AnexosService,
    private anexo2EService: Anexo2EService,
    private anexo5Hservice: Anexo5HService,
    private anexo3Cservice: Anexo3CService,
    private anexo2Lservice: Anexo2LService,
    private anexo2Mservice: Anexo2MService,
    private anexo3Dservice: Anexo3DService,
    private anexo3Aservice: Anexo3AService,
    private anexo2Fservice: Anexo2FService,
    private clienteService: FrontClienteService,
    private embarcacaoService: FrontEmbarcacaoService,
    private router: Router,
    private emailService: FrontEmailService,

  ) { }

  mostrarErroNatureza: boolean = false;

  ngAfterViewInit() {
    const modalAnexo2MElement = document.getElementById('modalAnexo2M');
    if (modalAnexo2MElement) {
        this.modalAnexo2M = new Modal(modalAnexo2MElement);
    }
  }

  consultarAnexo() {
    if (!this.cpfcnpjCliente.trim()) {
      this.limparDados();
      return;
    }

    const cpfCnpjSemMascara = this.cpfcnpjCliente.replace(/[^\d]+/g, '');
    this.clienteService.consultarClienteCPFCNPJ(cpfCnpjSemMascara).subscribe(cliente => {
      if (cliente) {
        this.cliente = cliente;
        this.nomeCliente = cliente.nome;
        this.listarEmbarcacoesPorCliente(cliente.id);
      } else {
        alert('Cliente não encontrado!');
        this.limparDados();
      }
    }, error => {
      console.error(error);
      alert('Erro ao consultar cliente!');
      this.limparDados();
    });
  }

  listarEmbarcacoesPorCliente(clienteId: number) {
    this.embarcacaoService.listarEmbarcacoesPorCliente(clienteId).subscribe(data => {
      this.embarcacoes = data;
      if (this.embarcacoes.length > 0) {
        this.idEmbarcacao = this.embarcacoes[0].id;
      }
    });
  }

  onEmbarcacaoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.idEmbarcacao = Number(selectElement.value);
  }

  retornar() {
    this.router.navigate(['/inicio']);
  }

  updateCharCount() {
    this.charCount = this.campotexto1.length;
  }

  openModal2M(opcao: number) {
    if (this.modalAnexo2M && opcao) {
      this.modalAnexo2M.show();
      this.selecao = opcao;
    }
  }

  confirmarAnexo2M() {
    if (this.modalAnexo2M) {
      this.modalAnexo2M.hide();
    }
    if (this.selecao === 1){
      this.ServicoTransfEmbTela();
    } else if (this.selecao === 2 ){
      this.ServicoTransfEmbEmail();
    }
    
  }

  gerarAnexo5H() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo5Hservice.anexo5H(this.opcao, this.campotexto1, selectedEmbarcacao);
    } else if (this.cliente) {
      this.anexo5Hservice.anexo5H(this.opcao, this.campotexto1, undefined, this.cliente);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo3C() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo3Cservice.anexo3C(selectedEmbarcacao, this.campotexto2);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo2L() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo2Lservice.anexo2L(selectedEmbarcacao);
    } else if (this.cliente) {
      this.anexo2Lservice.anexo2L(undefined, this.cliente);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo2M() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo2Mservice.anexo2M(selectedEmbarcacao, this.campotexto1, this.campotexto2);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo3D() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo3Dservice.anexo3D(this.campotexto1, this.campotexto2, this.opcao, selectedEmbarcacao);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo3A() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo3Aservice.anexo3A(this.opcao, this.campotexto1, undefined, this.cliente);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  gerarAnexo2F() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.anexo2Fservice.anexo2F(selectedEmbarcacao, this.campotexto1, this.campotexto2);
    } else {
      console.error('Embarcação selecionada não encontrada.');
    }
  }

  limparDados(form?: NgForm) {
    if (form) { form.resetForm(); }; //Reseta o formulário inteiro
    this.cpfcnpjCliente = '';
    this.nomeCliente = '';
    this.embarcacoes = [];
    this.cliente = undefined!;
    this.idEmbarcacao = undefined!;
    setTimeout(() => {
      this.clienteInput.nativeElement.focus();//Coloca o foco no campo de texto "Cliente (CPF ou CNPJ)"
    }, 0);
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      if (!this.opcao.includes(value)) {
        this.opcao += this.opcao ? `,${value}` : value;
      }
    } else {
      const values = this.opcao.split(',').filter(v => v !== value);
      this.opcao = values.join(',');
    }
  }

  async ServicoInscEmbTela() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);

    if (selectedEmbarcacao) {
      // Gerar PDF do Anexo 2E
      const anexo2EPdf = await this.anexo2EService.anexo2E(
        selectedEmbarcacao,
        'inscricao',
        this.campotexto1,
        this.campotexto2,
        this.campotexto3,
        'OK'
      );

      // Gerar PDF do Anexo 2D
      const anexo2DPdf = await this.anexosService.anexo2D(
        selectedEmbarcacao,
        this.cliente,
        'Inscrição',
        'OK'
      );

      // Verificar se os PDFs foram gerados corretamente
      const pdfs: Uint8Array[] = [];
      if (anexo2EPdf) {
        pdfs.push(anexo2EPdf);
      } else {
        console.error('Falha ao gerar Anexo 2E');
      }

      if (anexo2DPdf) {
        pdfs.push(anexo2DPdf);
      } else {
        console.error('Falha ao gerar Anexo 2D');
      }

      // Enviar o array de PDFs gerados para a função de concatenação e exibição
      if (pdfs.length > 0) {
        await this.concatenarEExibirPDFs(pdfs);
      }
    }
  }


  // Função para enviar anexos por e-mail
  async ServicoInscEmbEmail() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      const anexo2e = await this.anexo2EService.anexo2E(
        selectedEmbarcacao,
        'inscricao',
        this.campotexto1,
        this.campotexto2,
        this.campotexto3,
        'OK');

      const anexo2d = await this.anexosService.anexo2D(
        selectedEmbarcacao,
        this.cliente,
        'Inscrição',
        'OK');

      if (anexo2e && anexo2d) {

        const pdfs: Uint8Array[] = [anexo2e, anexo2d];

        this.emailService.enviarPDFsPorEmail(
          selectedEmbarcacao.cliente.email, // Destinatário
          'Projeto de apoio a Regularização de Operações Aquaviárias - PROA', // Assunto
          'Seguem os anexos para o serviço de Inscrição de Embarcação. Dúvidas consulte sua escola Naval.', //Conteudo do email
          ...pdfs
        )
      }
    }
  }

  //Alteração de Embarcação: Anexos 3D e 2D
  async ServicoAltcEmbTela() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);

    if (selectedEmbarcacao) {
      const anexo3DPdf = await this.anexo3Dservice.anexo3D(
        this.campotexto1,
        this.campotexto2,
        this.opcao,
        selectedEmbarcacao,
        "OK"
      );

      // Gerar PDF do Anexo 2D
      const anexo2DPdf = await this.anexosService.anexo2D(
        selectedEmbarcacao,
        this.cliente,
        this.natureza,
        'OK'
      );
      // Verificar se os PDFs foram gerados corretamente
      const pdfs: Uint8Array[] = [];
      if (anexo3DPdf) {
        pdfs.push(anexo3DPdf);
      } else {
        console.error('Falha ao gerar Anexo 2E');
      }

      if (anexo2DPdf) {
        pdfs.push(anexo2DPdf);
      } else {
        console.error('Falha ao gerar Anexo 2D');
      }

      // Enviar o array de PDFs gerados para a função de concatenação e exibição
      if (pdfs.length > 0) {
        await this.concatenarEExibirPDFs(pdfs);
      }

    }
  }

  //Alteração de Embarcação: Anexos 3D e 2D
  async ServicoAltEmbEmail() {

    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      this.opcao = "Atualização de Dados"
      const anexo3D = await this.anexo3Dservice.anexo3D(
        this.campotexto1,
        this.campotexto2,
        this.opcao,
        selectedEmbarcacao,
        "OK"
      );
      const anexo2d = await this.anexosService.anexo2D(
        selectedEmbarcacao,
        this.cliente,
        'Inscrição',
        'OK'
      );
      if (anexo3D && anexo2d) {
        const pdfs: Uint8Array[] = [anexo3D, anexo2d];

        this.emailService.enviarPDFsPorEmail(
          selectedEmbarcacao.cliente.email, // Destinatário
          'Projeto de apoio a Regularização de Operações Aquaviárias - PROA', // Assunto
          'Seguem os anexos para o serviço de Alteração de Embarcação. Dúvidas consulte sua escola Naval.', //Conteudo do email
          ...pdfs
        )
      }
    }
  }

  //Transferencia de Embarcação: Anexos 3C e 2M
  async ServicoTransfEmbTela() {
    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);

    if (selectedEmbarcacao) {
      const anexoPdf = await this.anexo3Cservice.anexo3C(selectedEmbarcacao, 'OK');


      const anexo2Pdf = await this.anexo2Mservice.anexo2M(selectedEmbarcacao, this.campotexto1, this.campotexto2, 'OK');

      // Verificar se os PDFs foram gerados corretamente
      const pdfs: Uint8Array[] = [];
      if (anexoPdf) {
        pdfs.push(anexoPdf);
      } else {
        console.error('Falha ao gerar Anexo 2E');
      }

      if (anexo2Pdf) {
        pdfs.push(anexo2Pdf);
      } else {
        console.error('Falha ao gerar Anexo 2D');
      }

      // Enviar o array de PDFs gerados para a função de concatenação e exibição
      if (pdfs.length > 0) {
        await this.concatenarEExibirPDFs(pdfs);
      }

    }
  }

  //Transferencia de Embarcação: Anexos 3C e 2M
  async ServicoTransfEmbEmail() {

    const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
    if (selectedEmbarcacao) {
      const anexoPdf = await this.anexo3Cservice.anexo3C(selectedEmbarcacao, 'OK');


      const anexo2Pdf = await this.anexo2Mservice.anexo2M(selectedEmbarcacao, this.campotexto1, this.campotexto2, 'OK');
      if (anexoPdf && anexo2Pdf) {
        const pdfs: Uint8Array[] = [anexoPdf, anexo2Pdf];

        this.emailService.enviarPDFsPorEmail(
          selectedEmbarcacao.cliente.email, // Destinatário
          'Projeto de apoio a Regularização de Operações Aquaviárias - PROA', // Assunto
          'Seguem os anexos para o serviço de Transferência de Titularidade de Embarcação. Dúvidas consulte sua escola Naval.', //Conteudo do email
          ...pdfs
        )
      }
    }
  }





  //Essa função é para concatenar em um único arquivo todos os PDF's e depois exibir em tela.
  async concatenarEExibirPDFs(pdfs: Uint8Array[]) {
    if (pdfs && pdfs.length > 0) {
      // Criar um novo documento PDF
      const novoPdf = await PDFDocument.create();

      // Para cada PDF passado como parâmetro, carregar e copiar suas páginas
      for (const pdfBytes of pdfs) {
        const pdf = await PDFDocument.load(pdfBytes);
        const paginas = await novoPdf.copyPages(pdf, pdf.getPageIndices());
        paginas.forEach(pagina => novoPdf.addPage(pagina));
      }

      // Gerar o PDF unificado
      const pdfUnificadoBytes = await novoPdf.save();

      // Criar um Blob e uma URL para exibir ou baixar o PDF
      const pdfBlob = new Blob([pdfUnificadoBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Abrir o PDF combinado em uma nova aba
      window.open(pdfUrl, '_blank');
    } else {
      console.error('Nenhum PDF foi fornecido para concatenar');
    }
  }


}
