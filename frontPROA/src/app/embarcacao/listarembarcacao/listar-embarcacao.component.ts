import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Embarcacao } from 'src/app/model/embarcacao';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { FrontClienteService } from 'src/app/services/front-cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listar-embarcacao',
  templateUrl: './listar-embarcacao.component.html',
  styleUrls: ['./listar-embarcacao.component.css']
})
export class ListarEmbarcacaoComponent implements OnInit {
  @ViewChild('clienteInput') clienteInput!: ElementRef;
  embarcacoes: Embarcacao[] = [];
  cpf: string = '';
  nomeCliente: string = '';

  constructor(
    private embarcacaoService: FrontEmbarcacaoService,
    private clienteService: FrontClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Não listar embarcações na inicialização
  }

  pesquisarPorCPF() {
    if (!this.cpf.trim()) {
      this.limparDados();
      return;
    }

    const cpfCnpjSemMascara = this.cpf.replace(/[^\d]+/g, '');
    
    this.clienteService.consultarClienteCPFCNPJ(cpfCnpjSemMascara).subscribe(cliente => {
      if (cliente) {
        this.nomeCliente = cliente.nome; // Preencher o nome do cliente
        this.embarcacaoService.listarEmbarcacoesPorCliente(cliente.id).subscribe(data => {
          console.log(data);
          this.embarcacoes = data;
        });
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

  alterarEmbarcacao(codigo: number) {
    this.router.navigate(['embarcacao/alterar-embarcacao', codigo]);
  }

  cadastrarEmbarcacao() {
    const cpfCnpjSemMascara = this.cpf.replace(/[^\d]+/g, '');
    console.log('CPF/CNPJ enviado:', cpfCnpjSemMascara);
    this.router.navigate(['embarcacao/cadastrar-embarcacao', { cpf: cpfCnpjSemMascara }]);
  }

  consultarEmbarcacao(codigo: number) {
    this.router.navigate(['embarcacao/consultar-embarcacao', codigo]);
  }

  excluirEmbarcacao(codigo: number) {
    if (confirm("Deseja Excluir a Embarcacao?")) {
      this.embarcacaoService.excluirEmbarcacao(codigo).subscribe(data => {
        console.log(data);
        this.pesquisarPorCPF();
      });
    }
  }

  manterMotor(idEmbarcacao: number) {
    this.router.navigate(['motor/manter-motor', idEmbarcacao]);
    console.log('teste', idEmbarcacao);
  }

  notafiscal(idEmbarcacao: number) {
    this.router.navigate(['notafiscal/notafiscal', idEmbarcacao]);
    console.log('teste', idEmbarcacao);
  }

  limparDados(form?: NgForm) {
    if (form) {
        form.resetForm(); // Reseta o formulário inteiro
    }
    this.cpf = '';
    this.nomeCliente = '';
    this.embarcacoes = [];
    setTimeout(() => {
        this.clienteInput.nativeElement.focus(); // Coloca o foco no campo de texto "Cliente (CPF ou CNPJ)"
    }, 0);
  }
}
