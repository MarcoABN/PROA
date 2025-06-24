import { Component, OnInit } from '@angular/core';
import { FrontPrestadorService } from '../services/front-prestador.service';
import { Prestador } from '../model/prestador';
import { ValidadorcpfcnpjService } from '../services/validacao/validadorcpfcnpj.service';
import { CepService } from '../services/cep.service';
import { FrontOrgmilitarService } from '../services/front-orgmilitar.service';
import { OrgMilitar } from '../model/orgmilitar';
import { Escolanautica } from '../model/escolanautica';
import { FrontEscolanauticaService } from '../services/front-escolanautica.service';

declare var bootstrap: any;

@Component({
  selector: 'app-empresa',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css'],
})
export class OpcoesComponent implements OnInit {
  prestadores: Prestador[] = [];
  prestador: Prestador = new Prestador();
  escolas: Escolanautica[] = [];
  escolanautica: Escolanautica = new Escolanautica;

  modalTitulo: string = '';
  cpfCnpjInvalido: boolean = false;

  orgMilitares: OrgMilitar[] = [];
  orgMilitar: OrgMilitar = new OrgMilitar();
  modalTituloOrgMilitar: string = '';


  
  

  constructor(
    private prestadorService: FrontPrestadorService,
    private escolaService: FrontEscolanauticaService,
    private validadorCpfCnpj: ValidadorcpfcnpjService,
    private cepService: CepService,
    private orgMilitarService: FrontOrgmilitarService,
  ) {}

  ngOnInit(): void {
    this.carregarPrestadores();
    this.carregarOrgMilitares();
    this.carregarEscolaNautica();
    
  }

  //Listar Organizações Militares
  carregarOrgMilitares(): void {
    this.orgMilitarService.listar().subscribe((data) => (this.orgMilitares = data));
  }

  //Listar Prestadores
  carregarPrestadores(): void {
    this.prestadorService.listarPrestador().subscribe((data) => {
      this.prestadores = data;
    });
  }

  carregarEscolaNautica(): void {
    this.escolaService.listarEscolaNautica().subscribe((data) => {
      this.escolas = data;
    });
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

  abrirModalCadastrarEscola(): void {
    this.modalTitulo = 'Cadastrar Escola';
    this.escolanautica = new Escolanautica();
    const modal = new bootstrap.Modal(document.getElementById('modalEscolaNautica'));
    modal.show();
  }

  abrirModalAlterarEscola(escolaNautica: Escolanautica): void {
    this.modalTitulo = 'Alterar Escola';
    this.escolanautica = { ...escolaNautica };
    const modal = new bootstrap.Modal(document.getElementById('modalEscolaNautica'));
    modal.show();
  }

  
  abrirModalOrgMilitar(orgMilitar?: OrgMilitar): void {
    this.modalTituloOrgMilitar = orgMilitar ? 'Alterar Organização Militar' : 'Cadastrar Organização Militar';
    this.orgMilitar = orgMilitar ? { ...orgMilitar } : new OrgMilitar();
    new bootstrap.Modal(document.getElementById('modalOrgMilitar')).show();
  }


  //Salvar Organização Militar
  salvarOrgMilitar(): void {
    const service = this.orgMilitar.id
      ? this.orgMilitarService.alterar(this.orgMilitar.id, this.orgMilitar)
      : this.orgMilitarService.inserir(this.orgMilitar);

    service.subscribe(() => this.carregarOrgMilitares());
    bootstrap.Modal.getInstance(document.getElementById('modalOrgMilitar')).hide();
  }
  
  //Salvar Prestador
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

  //Salvar EscolaNautica
  salvarEscolaNautica(): void {
  // Validar CNPJ antes de salvar
  if (!this.validadorCpfCnpj.validarCpfCnpj(this.escolanautica.cnpj)) {
    alert('CNPJ inválido!');
    return;
  }

  if (this.escolanautica.id) {
    this.escolaService.alterarEscolaNautica(this.escolanautica.id, this.escolanautica).subscribe(() => {
      this.carregarEscolaNautica();
    });
  } else {
    this.escolaService.incluirEscolaNautica(this.escolanautica).subscribe(() => {
      this.carregarEscolaNautica();
    });
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEscolaNautica'));
  modal.hide();
}

  //Excluir Org. Militar
  excluirOrgMilitar(id: number): void {
    this.orgMilitarService.excluir(id).subscribe(() => this.carregarOrgMilitares());
  }

  //Excluir Prestador
  excluirPrestador(id: number): void {
    if (confirm('Deseja realmente excluir este prestador?')) {
      this.prestadorService.excluirPrestador(id).subscribe(() => {
        this.carregarPrestadores();
      });
    }
  }

  //Excluir Prestador
  excluirEscolaNautica(id: number): void {
    if (confirm('Deseja realmente excluir esta Escola Nautica?')) {
      this.escolaService.excluirEscolaNautica(id).subscribe(() => {
        this.carregarEscolaNautica();
      });
    }
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

  
}
