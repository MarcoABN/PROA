import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/model/empresa';
import { FrontEmpresaService } from 'src/app/services/front-empresa.service';
import { CepService } from 'src/app/services/cep.service';
import { Cliente } from '../model/cliente';
import { FrontClienteService } from '../services/front-cliente.service';
import { OrgMilitar } from '../model/orgmilitar';
import { FrontOrgmilitarService } from '../services/front-orgmilitar.service';
import { NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  @ViewChild('orgMilitarForm') orgMilitarForm!: NgForm;

  empresaExiste: boolean = false;
  empresa: Empresa = new Empresa();
  cliente: Cliente[] = [];
  cpf: string = '';  // Novo campo para o CPF do cliente

  orgMilitares: OrgMilitar[] = [];
  novaOrgMilitar: OrgMilitar = new OrgMilitar();

  modalCadastroOrgMilitar: any;

  constructor(
    private empresaService: FrontEmpresaService,
    private router: Router,
    private cepService: CepService,
    private clienteService: FrontClienteService,
    private orgMilitarService: FrontOrgmilitarService
  ) { }

  ngOnInit(): void {
    this.verificarEmpresaCadastrada();
    this.carregarOrgMilitares();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('modalOrgMilitar');
    if (modalElement) {
        this.modalCadastroOrgMilitar = new Modal(modalElement);
    }
  }

  openModal() {
    if (this.modalCadastroOrgMilitar) {
        this.modalCadastroOrgMilitar.show();
    }
}

  verificarEmpresaCadastrada() {
    this.empresaService.listarEmpresa().subscribe(
      (empresas: Empresa[]) => {
        if (empresas.length > 0) {
          this.empresaExiste = true;
          this.empresa = empresas[0];  // Carregar a primeira empresa encontrada
          this.consultarRepresentates();
        }
      },
      error => {
        console.log('Erro ao buscar empresa:', error);.0
      }
    );
  }

  onSubmit() {
    if (!this.empresa.razaoSocial || !this.empresa.cnpj) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (this.empresaExiste) {
      this.empresaService.alterarEmpresa(this.empresa.id, this.empresa).subscribe(() => {
        this.retornar();
      });
    } else {
      this.empresaService.cadastrarEmpresa(this.empresa).subscribe(() => {
        this.retornar();
      });
    }
  }

  buscarEndereco() {
    if (this.empresa.cep) {
      this.cepService.buscarCep(this.empresa.cep).subscribe(
        dados => {
          if (dados) {
            this.empresa.logradouro = dados.logradouro;
            this.empresa.bairro = dados.bairro;
            this.empresa.uf = dados.uf;
            this.empresa.cidade = dados.localidade;
          }
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }

  confirmCancel() {
    const confirmation = confirm("Você realmente deseja cancelar a operação?");
    if (confirmation) {
      this.retornar();
    }
  }

  retornar() {
    this.router.navigate(['inicio']);
  }

  consultarRepresentates() {
    if (this.empresa) {
      this.clienteService.consultarRepresentantes(this.empresa.id).subscribe(data => {
        this.cliente = data;  // Recebe a lista de representantes
      });
    }
  }

  // Novo método para adicionar representante
  adicionarRepresentante() {
    if (this.cpf) {
      const cpfcnpj = this.cpf.replace(/[^\d]+/g, '');
      this.clienteService.consultarClienteCPFCNPJ(cpfcnpj).subscribe(
        cliente => {
          if (cliente) {
            cliente.representaEmpresa = 'S';  // Sinalizar como representante
            cliente.idEmpresa = this.empresa.id;
            this.clienteService.alterarCliente(cliente.id, cliente).subscribe(() => {
              console.log (cliente.id, '  ', cliente.nome, '  ', cliente.representaEmpresa);
              this.consultarRepresentates();  // Atualizar a lista de representantes
              this.cpf = '';  // Limpar o campo de CPF
            });
          } else {
            alert('Cliente não encontrado.');
          }
        },
        error => {
          console.error('Erro ao buscar cliente:', error);
        }
      );
    } else {
      alert('Por favor, insira um CPF válido.');
    }
  }

  // Novo método para remover representante
  removerRepresentante(cliente: Cliente) {
    cliente.representaEmpresa = 'N';  // Sinalizar que não é mais representante
    this.clienteService.alterarCliente(cliente.id, cliente).subscribe(() => {
      this.consultarRepresentates();  // Atualizar a lista de representantes
    });
  }

  carregarOrgMilitares() {
    this.orgMilitarService.listar().subscribe(
      (orgMilitares: OrgMilitar[]) => {
        this.orgMilitares = orgMilitares;
      },
      error => {
        console.error('Erro ao carregar organizações militares:', error);
      }
    );
  }


  salvarOrgMilitar() {
    if (this.orgMilitarForm.form.valid) {
      this.orgMilitarService.inserir(this.novaOrgMilitar).subscribe(
        () => {
          this.carregarOrgMilitares();
          this.novaOrgMilitar = new OrgMilitar();
          this.modalCadastroOrgMilitar.hide();
        },
        error => {
          console.error('Erro ao salvar organização militar:', error);
        }
      );
    }
  }

  excluirOrgMilitar(id: number) {
    if (confirm('Tem certeza que deseja excluir esta organização militar?')) {
      this.orgMilitarService.excluir(id).subscribe(
        () => {
          this.carregarOrgMilitares();
        },
        error => {
          console.error('Erro ao excluir organização militar:', error);
        }
      );
    }
  }
}


