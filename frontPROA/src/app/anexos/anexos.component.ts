import { Component, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Embarcacao } from "../model/embarcacao";
import { Cliente } from "../model/cliente";
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AnexosService } from "../services/anexos/anexo2d.service";
import { FrontClienteService } from "../services/front-cliente.service";
import { Modal } from 'bootstrap';
import { NgForm } from "@angular/forms";
import { Anexo2EService } from "../services/anexos/anexo2e.service";
import { Anexo5HService } from "../services/anexos/anexo5h.service";
import { Anexo3CService } from "../services/anexos/anexo3c.service";
import { Anexo2LService } from "../services/anexos/anexo2l.service";
import { Anexo2MService } from "../services/anexos/anexo2m.service";
import { Anexo3DService } from "../services/anexos/anexo3d.service";
import { Anexo3AService } from "../services/anexos/anexo3a.service";
import { Anexo2FService } from "../services/anexos/anexo2f.service";
import { Anexo2BService } from "../services/anexos/anexo2b.service";
import { Anexo2aService } from "../services/anexos/anexo2a.service";
import { Anexo2D212Service } from "../services/anexos/anexo2d212.service";
import { Anexo2E212Service } from "../services/anexos/anexo2e212.service";
import { Anexo2JService } from "../services/anexos/anexo2j.service";
import { Anexo2KService } from "../services/anexos/anexo2k.service";
import { Anexo5DService } from "../services/anexos/anexo5d.service";
import { Anexo1CService } from "../services/anexos/anexo1c.service";
import { Anexo5eService } from "../services/anexos/anexo5e.service";
import { FrontOrgmilitarService } from '../services/front-orgmilitar.service';
import { OrgMilitar } from '../model/orgmilitar';
import { FrontProcuracaoService } from "../services/front-procuracao.service";
import { Anexo3bService } from "../services/anexos/anexo3b.service";
import { Escolanautica } from "../model/escolanautica";
import { FrontEscolanauticaService } from "../services/front-escolanautica.service";


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
    tipoSelecaoVendedor: string = 'existente'; // 'existente' ou 'manual'
    proprietarioanterior: Cliente = new Cliente();
    nomeCliente: string = '';
    natureza!: string;
    natureza2B!: string;
    opcao: string = '';
    campotexto1: string = '';
    campotexto2: string = '';
    campotexto3: string = '';
    campovalor: number = 0;
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
    modalAnexo2A: any;
    modalAnexo2J: any;
    modalAnexo2E212: any;
    modalAnexo2K: any;
    modalAnexo5D: any;
    modalAnexo5E: any;
    modalAnexo3B: any;
    orgMilitares: OrgMilitar[] = [];
    selectedOrgMilitar: OrgMilitar | null = null;
    isMotoAquatica: boolean = false;
    listaEscolas: Escolanautica[] = [];
    escolaSelecionada: Escolanautica | null = null;

    carregando: boolean = false;



    requerimentosLista = [
        { value: 1, label: '1 - CONCESSÃO DE CHA POR CORRESPONDÊNCIA/EQUIVALÊNCIA', checked: false },
        { value: 2, label: '2 - EMISSÃO/RENOVAÇÃO', checked: false },
        { value: 3, label: '3 - RENOVAÇÃO DE CHA (ARA, MSA OU CPA)', checked: false },
        { value: 4, label: '4 - EMISSÃO CERT. DE CADASTRO DE MARINAS, CLUBES, ETC.', checked: false },
        { value: 5, label: '5 - RENOVAÇÃO CERT. DE CADASTRO DE MARINAS, CLUBES, ETC.', checked: false },
        { value: 6, label: '6 - CANC. CERT. DE CADASTRO DE MARINAS, CLUBES, ETC.', checked: false },
        { value: 7, label: '7 - CRED. ESTAB. TRINAMENTO NÁUTICO / PESSOA FÍSICA', checked: false },
        { value: 8, label: '8 - CRED. DE ÓRGÃO DO ESCOTEIRO DO MAR', checked: false },
        { value: 9, label: '9 - CRED. ESTAB. TRINAMENTO NÁUTICO / VELEIRO', checked: false },
        { value: '10a', label: '10A - ESTAB. TREINAMENTO NÁUTICO / PESSOA FÍSICA', checked: false },
        { value: '10b', label: '10B - ÓRGÃO DO ESCOTEIRO DO MAR', checked: false },
        { value: '10c', label: '10C - CRED. ESTAB. TRINAMENTO NÁUTICO / VELEIRO', checked: false },
        { value: 11, label: '11 - DESCREDENCIAMENTO VOLUNTÁRIO', checked: false },
        { value: 12, label: '12 - PEDIDO DE REVISÃO DE PROVAS DE CAPITÃO AMADOR', checked: false },
    ];

    constructor(

        private router: Router,
        private route: ActivatedRoute,

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
        private anexo2Aservice: Anexo2aService,
        private anexo2Jservice: Anexo2JService,
        private anexo2D212service: Anexo2D212Service,
        private anexo2E212service: Anexo2E212Service,
        private anexo2Kservice: Anexo2KService,
        private anexo5Dservice: Anexo5DService,
        private anexo1Cservice: Anexo1CService,
        private anexo5Eservice: Anexo5eService,
        private anexo3Bservice: Anexo3bService,

        private procuracao01Service: FrontProcuracaoService,

        private clienteService: FrontClienteService,
        private embarcacaoService: FrontEmbarcacaoService,
        private orgMilitarService: FrontOrgmilitarService,
        private escolaService: FrontEscolanauticaService
    ) { }

    mostrarErroNatureza: boolean = false;

    ngOnInit() {
        this.carregarOrgMilitares();
        this.carregarInstrutores();

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

        const modalAnexo2AElement = document.getElementById('modalAnexo2A');
        if (modalAnexo2AElement) {
            this.modalAnexo2A = new Modal(modalAnexo2AElement);
        }

        const modalAnexo2E212Element = document.getElementById('modalAnexo2E212');
        if (modalAnexo2E212Element) {
            this.modalAnexo2E212 = new Modal(modalAnexo2E212Element);
        }

        const modalAnexo2JElement = document.getElementById('modalAnexo2J');
        if (modalAnexo2JElement) {
            this.modalAnexo2J = new Modal(modalAnexo2JElement);
        }

        const modalAnexo2KElement = document.getElementById('modalAnexo2K');
        if (modalAnexo2KElement) {
            this.modalAnexo2K = new Modal(modalAnexo2KElement);
        }

        const modalAnexo5DElement = document.getElementById('modalAnexo5D');
        if (modalAnexo5DElement) {
            this.modalAnexo5D = new Modal(modalAnexo5DElement);
        }

        const modalAnexo5EElement = document.getElementById('modalAnexo5E');
        if (modalAnexo5EElement) {
            this.modalAnexo5E = new Modal(modalAnexo5EElement);
        }

        const modalAnexo3BElement = document.getElementById('modalAnexo3B');
        if (modalAnexo3BElement) {
            this.modalAnexo3B = new Modal(modalAnexo3BElement);
        }
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

    carregarInstrutores() {
        //Desenvolver lógica para listar instrutores aqui
        this.escolaService.listarEscolaNautica().subscribe({
            next: (escolas => {
                this.listaEscolas = escolas;
            }),
            error: (erro) => {
                console.error('Erro ao listar escolas', erro);
            }
        })
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

            //Validação para verificar se é moto aquatica. Se sim, habilita botões da Normam 212
            if (this.embarcacoes[0].tipoEmbarcacao == 'MOTO AQUÁTICA') {
                this.isMotoAquatica = true;
            }
        });

    }

    onEmbarcacaoChange(event: any) {
        const selectElement = event.target as HTMLSelectElement;
        this.idEmbarcacao = Number(selectElement.value);

        //validação ao alterar embarcação selecionada e habilitar normam212 caso seja moto aquatica
        const embarcacaoSelecionada = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (embarcacaoSelecionada) {
            this.isMotoAquatica = embarcacaoSelecionada.tipoEmbarcacao === 'MOTO AQUÁTICA';
        } else {
            this.isMotoAquatica = false;
        }

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
            this.opcao = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2E.show();
        }
    }
    openModal5H() {
        if (this.modalAnexo5H) {
            this.opcao = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.limparSelecoes();
            this.modalAnexo5H.show();
        }
    }

    openModal2M() {
        if (this.modalAnexo2M) {
            this.tipoSelecaoVendedor = 'existente';
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
            this.limparSelecoes3A();
            this.modalAnexo3A.show();
        }

    }

    openModal2F() {
        if (this.modalAnexo2F) {
            this.tipoSelecaoVendedor = 'existente';
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

    openModal2A() {
        if (this.modalAnexo2A) {
            this.opcao = '';
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2A.show();
        }

    }

    openModal2E212() {
        if (this.modalAnexo2E212) {
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campovalor = 0;
            this.modalAnexo2E212.show();
        }

    }

    openModal2J() {
        if (this.modalAnexo2A) {
            this.opcao = '';
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo2J.show();
        }

    }

    openModal2K() {
        if (this.modalAnexo2K) {
            this.tipoSelecaoVendedor = 'existente';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.proprietarioanterior
            this.modalAnexo2K.show();
        }

    }

    openModal5D() {
        if (this.modalAnexo5D) {
            this.opcao = '';
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '';
            this.campotexto3 = '';
            this.modalAnexo5D.show();
        }

    }

    openModal5E() {
        if (this.modalAnexo5E) {
            this.opcao = '';
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '6';
            this.campotexto3 = '';
            this.modalAnexo5E.show();
        }

    }

    openModal3B() {
        if (this.modalAnexo3B) {
            this.opcao = '';
            this.natureza = '';
            this.campotexto1 = '';
            this.campotexto2 = '6';
            this.campotexto3 = '';
            this.modalAnexo3B.show();
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

    confirmarAnexo2M(): void {
        if (this.tipoSelecaoVendedor === 'existente') {

            this.clienteService.consultarClienteCPFCNPJ(this.campotexto1).subscribe({
                next: (cliente) => {
                    this.proprietarioanterior = cliente; // atribui o resultado aqui!
                    this.gerarAnexo2M(this.proprietarioanterior); // só chama depois de receber!
                    this.modalAnexo2M.hide();
                },
                error: (err) => {
                    console.error('Erro ao consultar cliente:', err);
                }
            });
        } else {
            this.gerarAnexo2M(this.proprietarioanterior);
            this.modalAnexo2M.hide();
        }
        this.limparDados2K2F();
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

    confirmarAnexo2F(): void {
        if (this.tipoSelecaoVendedor === 'existente') {

            this.clienteService.consultarClienteCPFCNPJ(this.campotexto1).subscribe({
                next: (cliente) => {
                    this.proprietarioanterior = cliente; // atribui o resultado aqui!
                    this.gerarAnexo2F(this.proprietarioanterior); // só chama depois de receber!
                    this.modalAnexo2F.hide();
                },
                error: (err) => {
                    // Trate o erro se necessário
                    console.error('Erro ao consultar cliente:', err);
                    // Pode mostrar uma mensagem de erro para o usuário
                }
            });

        } else {
            // Lógica para usar os dados inseridos manualmente
            console.log('Dados do proprietário anterior:', this.proprietarioanterior);
            this.gerarAnexo2F(this.proprietarioanterior);
            this.modalAnexo2F.hide();
        }
        this.limparDados();
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

    confirmarAnexo2A() {
        if (!this.opcao) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo2A) {
            this.modalAnexo2A.hide();
        }
        this.gerarAnexo2A();
    }

    confirmarAnexo2E212() {
        if (this.modalAnexo2M) {
            this.modalAnexo2M.hide();
        }
        this.gerarAnexo2E212();
    }

    confirmarAnexo2J() {
        if (!this.opcao) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo2J) {
            this.modalAnexo2J.hide();
        }
        this.gerarAnexo2J();
    }

    //Anexo 2K -Invertendo lógica da seleção de cliente
    confirmarAnexo2K(): void {
        if (this.tipoSelecaoVendedor === 'existente') {

            this.clienteService.consultarClienteCPFCNPJ(this.campotexto1).subscribe({
                next: (cliente) => {
                    this.proprietarioanterior = cliente; // atribui o resultado aqui!
                    this.gerarAnexo2K(this.proprietarioanterior); // só chama depois de receber!
                    this.modalAnexo2K.hide();
                },
                error: (err) => {
                    // Trate o erro se necessário
                    console.error('Erro ao consultar cliente:', err);
                    // Pode mostrar uma mensagem de erro para o usuário
                }
            });

        } else {
            // Lógica para usar os dados inseridos manualmente
            console.log('Dados do proprietário anterior:', this.proprietarioanterior);
            this.gerarAnexo2K(this.proprietarioanterior);
            this.modalAnexo2K.hide();
        }
        this.limparDados();
    }


    confirmarAnexo5D() {
        if (!this.opcao) {
            this.mostrarErroNatureza = true;
            return;
        }

        this.mostrarErroNatureza = false;
        if (this.modalAnexo5D) {
            this.modalAnexo5D.hide();
        }
        this.gerarAnexo5D();
    }

    confirmarAnexo5E() {
        if (this.escolaSelecionada) {
            this.gerarAnexo5E();
            this.modalAnexo5E.hide();
            // fecha o modal se necessário
        } else {
            console.log('Erro no modal 5E')
        }
    }

    confirmarAnexo3B() {
        if (this.escolaSelecionada) {
            this.gerarAnexo3B();
            this.modalAnexo3B.hide();
            // fecha o modal se necessário
        } else {
            console.log('Erro no modal 3B')
        }
    }

    //aqui

    async gerarProcuracao01() {
        this.carregando = true;

        try {
            const pdf = await this.procuracao01Service.gerarProcuracao(this.cliente.id); // seu método
            // lógica para download ou exibição
        } catch (erro) {
            console.error("Erro ao gerar procuração", erro);
            // exibir mensagem de erro, se desejar
        } finally {
            this.carregando = false;
        }
    }

    //gerarAnexo2D
    gerarPdf() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexos2DService.anexo2D(selectedEmbarcacao, this.cliente, this.natureza);
            console.log(this.natureza);
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
        if (this.cliente) {
            this.anexo5Hservice.anexo5H(this.opcao, this.campotexto1, this.cliente);
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
            this.anexo2Lservice.anexo2L(this.cliente);
        } else if (this.cliente) {
            0
            this.anexo2Lservice.anexo2L(this.cliente);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2M(propanterior: Cliente) {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Mservice.anexo2M(selectedEmbarcacao,
                propanterior.cpfcnpj,
                propanterior.nome,
                (propanterior.celular ?? ''),
                (propanterior.email ?? ''),
            );
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
        if (this.cliente) {
            this.anexo3Aservice.anexo3A(this.opcao, this.campotexto1, this.cliente);
        } else {
            console.error('Cliente não informado');
        }
    }

    gerarAnexo2F(propanterior: Cliente) {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Fservice.anexo2F(selectedEmbarcacao, propanterior, this.campotexto2);
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

    gerarAnexo2A() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Aservice.anexo2A(selectedEmbarcacao, this.opcao, this.campotexto1, this.campotexto2, this.campotexto3);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2D212() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2D212service.anexo2D212(selectedEmbarcacao);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2E212() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2E212service.anexo2E212(selectedEmbarcacao, this.campotexto1, this.campotexto2);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2J() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Jservice.anexo2J(selectedEmbarcacao, this.opcao);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo2K(propanterior: Cliente) {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo2Kservice.anexo2K(selectedEmbarcacao, propanterior, this.campotexto2);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo5D() {
        if (this.cliente) {
            this.anexo5Dservice.anexo5D(this.cliente, this.opcao);
        } else {
            console.error('Cliente não encontrado');
        }
    }

    gerarAnexo1C() {
        const selectedEmbarcacao = this.embarcacoes.find(e => e.id === this.idEmbarcacao);
        if (selectedEmbarcacao) {
            this.anexo1Cservice.anexo1C(this.cliente);
        } else if (this.cliente) {
            this.anexo1Cservice.anexo1C(this.cliente);
        } else {
            console.error('Embarcação selecionada não encontrada.');
        }
    }

    gerarAnexo5E() {
        if (this.cliente && this.escolaSelecionada) {
            this.anexo5Eservice.anexo5E(this.cliente, this.escolaSelecionada, this.campotexto1, this.campotexto2);
            console.log('chamou a geração do 5E com sucesso')
        } else {
            console.error('Cliente ou instrutor não encontrado');
        }
    }

    gerarAnexo3B() {
        if (this.cliente && this.escolaSelecionada) {
            this.anexo3Bservice.anexo3B(this.cliente, this.escolaSelecionada, this.campotexto1);
            console.log('chamou a geração do 3B com sucesso')
        } else {
            console.error('Cliente ou instrutor não encontrado');
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

    limparSelecoes() {
        // Limpa a variável que armazena as opções selecionadas
        this.opcao = '';
        this.campotexto1 = '';
        this.charCount = 0;

        // Desmarca todos os checkboxes - FORMA CORRIGIDA
        const checkboxes = document.querySelectorAll('#modalAnexo5H input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
    limparSelecoes3A() {
        this.opcao = '';
        this.campotexto1 = '';
        this.charCount = 0;

        const checkboxes = document.querySelectorAll('#modalAnexo3A input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    limparDados2K2F(): void {
        this.proprietarioanterior = new Cliente();
        this.campotexto1 = '';

    }

}
