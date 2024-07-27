import { Component, AfterViewInit } from "@angular/core";
import { Embarcacao } from "../model/embarcacao";
import { Cliente } from "../model/cliente";
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AnexosService } from "../services/anexos/anexo2D.service";
import { FrontClienteService } from "../services/front-cliente.service";
import { Modal } from 'bootstrap';
import { Anexo2EService } from "../services/anexos/anexo2e.service";
import { Anexo5HService } from "../services/anexos/anexo5h.service";
import { Anexo3CService } from "../services/anexos/anexo3c.service";
import { Anexo2LService } from "../services/anexos/anexo2L.service";
import { Anexo2MService } from "../services/anexos/anexo2M.service";

@Component({
    selector: 'app-anexos',
    templateUrl: './anexos.component.html',
    styleUrls: ['./anexos.component.css']
})
export class AnexosComponent implements AfterViewInit {
    idEmbarcacao!: number;
    cpfcnpjCliente!: string;
    embarcacao!: Embarcacao;
    cliente!: Cliente;
    nomeCliente: string = '';
    natureza!: string;
    opcao: string = '';
    campotexto1 : string = '';
    campotexto2 : string = '';
    campotexto3 : string = '';
    charCount: number = 0;
    naturezaModal: any;
    modalAnexo2E: any;
    modalAnexo5H: any;
    embarcacoes: Embarcacao[] = [];

    constructor(
        private anexosService: AnexosService,
        private anexo2EService: Anexo2EService,
        private anexo5Hservice: Anexo5HService,
        private anexo3Cservice: Anexo3CService,
        private anexo2Lservice: Anexo2LService,
        private anexo2Mservice: Anexo2MService,
        private clienteService: FrontClienteService,
        private embarcacaoService: FrontEmbarcacaoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    mostrarErroNatureza: boolean = false;

    ngAfterViewInit() {
        const naturezaModalElement = document.getElementById('naturezaModal');
                if (naturezaModalElement) {
            this.naturezaModal = new Modal(naturezaModalElement);            
        }

        const modalAnexo2EElement = document.getElementById('modalAnexo2E');
        if (modalAnexo2EElement) {
            this.modalAnexo2E = new Modal(modalAnexo2EElement);            
        }

        const modalAnexo5HElement = document.getElementById('modalAnexo5H');
        if (modalAnexo5HElement) {
            this.modalAnexo5H = new Modal(modalAnexo5HElement);            
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

    openModal() {
        if (this.naturezaModal) {
            this.naturezaModal.show();
        }
    }
    openModal2E() {
        if (this.modalAnexo2E) {
            this.modalAnexo2E.show();
        }
    }
    openModal5H() {
        if (this.modalAnexo5H) {
            this.modalAnexo5H.show();
        }
    }

    confirmarNatureza() {
        if (!this.natureza) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.naturezaModal) {
            this.naturezaModal.hide();
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
            this.anexo5Hservice.anexo5H(selectedEmbarcacao, this.opcao, this.campotexto1);
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
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2M() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Mservice.anexo2M(selectedEmbarcacao);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    limparDados() {
        this.nomeCliente = '';
        this.embarcacoes = [];
        this.idEmbarcacao = undefined!;
        this.cliente = undefined!;
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
