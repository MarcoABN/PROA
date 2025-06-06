import { Component, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Embarcacao } from "../model/embarcacao";
import { Cliente } from "../model/cliente";
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AnexosService } from "../services/anexos/anexo2D.service";
import { FrontClienteService } from "../services/front-cliente.service";
import { Modal } from 'bootstrap';
import { NgForm } from "@angular/forms";
import { Anexo2EService } from "../services/anexos/anexo2e.service";
import { Anexo5HService } from "../services/anexos/anexo5h.service";
import { Anexo3CService } from "../services/anexos/anexo3c.service";
import { Anexo2LService } from "../services/anexos/anexo2L.service";
import { Anexo2MService } from "../services/anexos/anexo2M.service";
import { Anexo3DService } from "../services/anexos/anexo3D.service";
import { Anexo3AService } from "../services/anexos/anexo3A.service";
import { Anexo2FService } from "../services/anexos/anexo2F.service";
import { Anexo2BService } from "../services/anexos/anexo2B.service";
import { FrontOrgmilitarService } from '../services/front-orgmilitar.service';
import { OrgMilitar } from '../model/orgmilitar';
import { FrontProcuracaoService } from "../services/front-procuracao.service";
 
@Component({
    selector: 'app-anexos',
    templateUrl: './anexos.component.html',
    styleUrls: ['./anexos.component.css']
})
export class AnexosComponent implements AfterViewInit {
    @ViewChild('clienteInput') clienteInput!: ElementRef;
    
    idEmbarcacao!: number;
    embarcacoes: Embarcacao[] = [];
    cpfcnpjCliente!: string;
    embarcacao!: Embarcacao;
    cliente!: Cliente;
    nomeCliente: string = '';
    natureza!: string;
    natureza2B!: string;
    opcao: string = '';
    campotexto1: string = '';
    campotexto2: string = '';
    campotexto3: string = '';
    charCount: number = 0;
    modalAnexo2D: any;
    modalAnexo2E: any;
    modalAnexo5H: any;
    modalAnexo2M: any;
    modalAnexo3D: any;
    modalAnexo3C: any;
    modalAnexo3A: any;
    modalAnexo2F: any;
    modalAnexo2B: any;
    orgMilitares: OrgMilitar[] = [];
    selectedOrgMilitar: OrgMilitar | null = null;
    
    

    constructor(
        private anexos2DService: AnexosService,
        private anexo2EService: Anexo2EService,
        private anexo5Hservice: Anexo5HService,
        private anexo3Cservice: Anexo3CService,
        private anexo2Lservice: Anexo2LService,
        private anexo2Mservice: Anexo2MService,
        private anexo3Dservice: Anexo3DService,
        private anexo3Aservice: Anexo3AService,
        private anexo2Fservice: Anexo2FService,
        private anexo2Bservice: Anexo2BService,
        private clienteService: FrontClienteService,
        private embarcacaoService: FrontEmbarcacaoService,
        private orgMilitarService: FrontOrgmilitarService,
        private router: Router,
        private route: ActivatedRoute,
        private procuracao01Service: FrontProcuracaoService
    ) { }

    mostrarErroNatureza: boolean = false;

    ngOnInit() {
        this.carregarOrgMilitares();
      }
      
      carregarOrgMilitares() {
        this.orgMilitarService.listar().subscribe(
          (orgMilitares) => {
            this.orgMilitares = orgMilitares;
          },
          (error) => {
            console.error('Erro ao carregar organizações militares', error);
          }
        );
      }

    ngAfterViewInit() {
        const modalAnexo2DElement = document.getElementById('modalAnexo2D');
        if (modalAnexo2DElement) {
            this.modalAnexo2D = new Modal(modalAnexo2DElement);
        }
        

        const modalAnexo2EElement = document.getElementById('modalAnexo2E');
        if (modalAnexo2EElement) {
            this.modalAnexo2E = new Modal(modalAnexo2EElement);
        }

        const modalAnexo5HElement = document.getElementById('modalAnexo5H');
        if (modalAnexo5HElement) {
            this.modalAnexo5H = new Modal(modalAnexo5HElement);
        }

        const modalAnexo2MElement = document.getElementById('modalAnexo2M');
        if (modalAnexo2MElement) {
            this.modalAnexo2M = new Modal(modalAnexo2MElement);
        }

        const modalAnexo3DElement = document.getElementById('modalAnexo3D');
        if (modalAnexo3DElement) {
            this.modalAnexo3D = new Modal(modalAnexo3DElement);
        }

        const modalAnexo3CElement = document.getElementById('modalAnexo3C');
        if (modalAnexo3CElement) {
            this.modalAnexo3C = new Modal(modalAnexo3CElement);
        }

        const modalAnexo3AElement = document.getElementById('modalAnexo3A');
        if (modalAnexo3AElement) {
            this.modalAnexo3A = new Modal(modalAnexo3AElement);
        }

        const modalAnexo2FElement = document.getElementById('modalAnexo2F');
        if (modalAnexo2FElement) {
            this.modalAnexo2F = new Modal(modalAnexo2FElement);
        }

        const modalAnexo2BElement = document.getElementById('modalAnexo2B');
        if (modalAnexo2BElement) {
            this.modalAnexo2B = new Modal(modalAnexo2BElement);
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

    openModal2D() {
        if (this.modalAnexo2D) {
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2D.show();
        }
    }
    openModal2E() {
        if (this.modalAnexo2E) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2E.show();
        }
    }
    openModal5H() {
        if (this.modalAnexo5H) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo5H.show();
        }
    }

    openModal2M() {
        if (this.modalAnexo2M) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2M.show();
        }

    }

    openModal3D() {
        if (this.modalAnexo3D) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo3D.show();
        }

    }


    openModal3C() {
        if (this.modalAnexo3C) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo3C.show();
        }

    }

    openModal3A() {
        if (this.modalAnexo3A) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo3A.show();
        }

    }

    openModal2F() {
        if (this.modalAnexo2F) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2F.show();
        }

    }

    openModal2B() {
        if (this.modalAnexo2B) {
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2B.show();
        }

    }

    confirmarNatureza() {
        if (!this.natureza) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo2D) {
            this.modalAnexo2D.hide();
        }
        this.gerarPdf();
    }

    confirmarAnexo2E() {
        if (!this.opcao) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo2E) {
            this.modalAnexo2E.hide();
        }
        this.gerarAnexo2E();
    }

    confirmarAnexo5H() {
        if (!this.opcao) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo5H) {
            this.modalAnexo5H.hide();
        }
        this.gerarAnexo5H();
    }

    confirmarAnexo2M() {
        if (this.modalAnexo2M) {
            this.modalAnexo2M.hide();
        }
        this.gerarAnexo2M();
    }

    confirmarAnexo3D() {
        if (this.modalAnexo3D) {
            this.modalAnexo3D.hide();
        }
        this.gerarAnexo3D();
    }

    confirmarAnexo3C() {
        if (this.modalAnexo3C) {
            this.modalAnexo3C.hide();
        }
        this.gerarAnexo3C();
    }

    confirmarAnexo3A() {
        if (this.modalAnexo3A) {
            this.modalAnexo3A.hide();
        }
        this.gerarAnexo3A();
    }

    confirmarAnexo2F() {
        if (this.modalAnexo2F) {
            this.modalAnexo2F.hide();
        }
        this.gerarAnexo2F();
    }

    confirmarAnexo2B() {
        if (!this.modalAnexo2B) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo2B) {
            this.modalAnexo2B.hide();
        }
        this.gerarAnexo2B();
    }

//aqui

    gerarProcuracao01() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.procuracao01Service.procuracao01(selectedEmbarcacao.id);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }


    gerarPdf() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexos2DService.anexo2D(selectedEmbarcacao, this.cliente, this.natureza);
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

    gerarAnexo2B() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Bservice.anexo2B(selectedEmbarcacao, this.cliente, this.natureza2B);
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
