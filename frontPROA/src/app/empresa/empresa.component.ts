import { Component, OnInit } from '@angular/core';
import { FrontPrestadorService } from '../services/front-prestador.service';
import { Prestador } from '../model/prestador';
import { ValidadorcpfcnpjService } from '../services/validacao/validadorcpfcnpj.service';
import { CepService } from '../services/cep.service';
import { FrontOrgmilitarService } from '../services/front-orgmilitar.service';
import { OrgMilitar } from '../model/orgmilitar';
import { Procuracao } from '../model/procuracao';
import { FrontProcuracaoService } from '../services/front-procuracao.service';

declare var bootstrap: any;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  prestadores: Prestador[] = [];
  prestador: Prestador = new Prestador();
  modalTitulo: string = '';
  cpfCnpjInvalido: boolean = false;
  procuracao: Procuracao = new Procuracao();

  // Organizações Militares
  orgMilitares: OrgMilitar[] = [];
  orgMilitar: OrgMilitar = new OrgMilitar();
  modalTituloOrgMilitar: string = '';

  constructor(
    private prestadorService: FrontPrestadorService,
    private validadorCpfCnpj: ValidadorcpfcnpjService,
    private cepService: CepService,
    private orgMilitarService: FrontOrgmilitarService,
    private procuracaoService: FrontProcuracaoService
  ) {}

  ngOnInit(): void {
    this.carregarPrestadores();
    this.carregarOrgMilitares();
    this.carregarProcuracao01();
  }

  carregarProcuracao01(): void {
    this.procuracaoService.consultarProcuracao("procuracao01").subscribe((dados: Procuracao) => {
      this.procuracao = dados || new Procuracao(); // Carrega o texto ou inicializa vazio
    });
  }

  salvarProcuracao(): void {
    this.procuracaoService.alterarProcuracao(this.procuracao.id!, this.procuracao).subscribe(() => {
      alert('Texto da procuração salvo com sucesso!');
    });
  }


  carregarPrestadores(): void {
    this.prestadorService.listarPrestador().subscribe((data) => {
      this.prestadores = data;
    });
  }

  salvarPrestador(): void {
    if (this.cpfCnpjInvalido) {
      alert('CPF/CNPJ inválido!');
      return;
    }

    if (this.prestador.id) {
      this.prestadorService.alterarPrestador(this.prestador.id, this.prestador).subscribe(() => {
        this.carregarPrestadores();
      });
    } else {
      this.prestadorService.incluirPrestador(this.prestador).subscribe(() => {
        this.carregarPrestadores();
      });
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPrestador'));
    modal.hide();
  }

  validarCpfCnpj(cpfCnpj: string | undefined): void {
    if (!cpfCnpj) {
      this.cpfCnpjInvalido = true;
      return;
    }
    this.cpfCnpjInvalido = !this.validadorCpfCnpj.validarCpfCnpj(cpfCnpj);
  }

  buscarEndereco(cep: string | undefined): void {
    if (!cep) {
      alert('CEP inválido!');
      return;
    }
    this.cepService.buscarCep(cep).subscribe(
      (data) => {
        this.prestador.logradouro = data.logradouro;
        this.prestador.bairro = data.bairro;
        this.prestador.cidade = data.localidade;
        this.prestador.uf = data.uf;
      },
      (error) => {
        alert('CEP não encontrado!');
      }
    );
  }

  abrirModalCadastrar(): void {
    this.modalTitulo = 'Cadastrar Prestador';
    this.prestador = new Prestador();
    const modal = new bootstrap.Modal(document.getElementById('modalPrestador'));
    modal.show();
  }

  abrirModalAlterar(prestador: Prestador): void {
    this.modalTitulo = 'Alterar Prestador';
    this.prestador = { ...prestador };
    const modal = new bootstrap.Modal(document.getElementById('modalPrestador'));
    modal.show();
  }



  excluirPrestador(id: number): void {
    if (confirm('Deseja realmente excluir este prestador?')) {
      this.prestadorService.excluirPrestador(id).subscribe(() => {
        this.carregarPrestadores();
      });
    }
  }

  // Organizações Militares
  carregarOrgMilitares(): void {
    this.orgMilitarService.listar().subscribe((data) => (this.orgMilitares = data));
  }

  abrirModalOrgMilitar(orgMilitar?: OrgMilitar): void {
    this.modalTituloOrgMilitar = orgMilitar ? 'Alterar Organização Militar' : 'Cadastrar Organização Militar';
    this.orgMilitar = orgMilitar ? { ...orgMilitar } : new OrgMilitar();
    new bootstrap.Modal(document.getElementById('modalOrgMilitar')).show();
  }

  salvarOrgMilitar(): void {
    const service = this.orgMilitar.id
      ? this.orgMilitarService.alterar(this.orgMilitar.id, this.orgMilitar)
      : this.orgMilitarService.inserir(this.orgMilitar);

    service.subscribe(() => this.carregarOrgMilitares());
    bootstrap.Modal.getInstance(document.getElementById('modalOrgMilitar')).hide();
  }

  excluirOrgMilitar(id: number): void {
    this.orgMilitarService.excluir(id).subscribe(() => this.carregarOrgMilitares());
  }
}
