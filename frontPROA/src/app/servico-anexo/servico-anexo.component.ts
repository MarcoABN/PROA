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
  ) { }

  mostrarErroNatureza: boolean = false;

  ngAfterViewInit() {
      

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


  gerarPdf() {
      const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
      if (selectedEmbarcacao) {
          this.anexosService.anexo2D(selectedEmbarcacao, this.cliente, this.natureza);
      } else {
          console.error('Embarcação selecionada não encontrada.');
      }
  }

  gerarAnexo2E() {
      const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
      if (selectedEmbarcacao) {
          this.anexo2EService.anexo2E(selectedEmbarcacao, this.opcao, this.campotexto1, this.campotexto2, this.campotexto3);
      } else {
          console.error('Embarcação selecionada não encontrada.');
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
          this.anexo3Cservice.anexo3C(selectedEmbarcacao);
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
      if (form) {form.resetForm();}; //Reseta o formulário inteiro
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
}
