import { Component, AfterViewInit } from "@angular/core";
import { Embarcacao } from "../model/embarcacao";
import { Cliente } from "../model/cliente";
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AnexosService } from "../services/anexos/anexo2D.service";
import { FrontClienteService } from "../services/front-cliente.service";
import { Modal } from 'bootstrap';

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
    naturezaModal: any;
    embarcacoes: Embarcacao[] = [];

    constructor(
        private anexosService: AnexosService,
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

    openModal() {
        if (this.naturezaModal) {
            this.naturezaModal.show();
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

    gerarPdf() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexosService.anexo2D(selectedEmbarcacao, this.cliente, this.natureza);
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
}
