import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Embarcacao } from 'src/app/model/embarcacao';
import { Motor } from 'src/app/model/motor';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { FrontMotorService } from 'src/app/services/front-motor.service';
import { CepService } from 'src/app/services/cep.service';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from 'src/app/services/front-cliente.service';

@Component({
  selector: 'app-cadastrar-embarcacao',
  templateUrl: './cadastrar-embarcacao.component.html',
  styleUrls: ['./cadastrar-embarcacao.component.css']
})
export class CadastrarEmbarcacaoComponent implements OnInit {

  cpfcnpj!: string;
  cliente!: Cliente;
  idEmbarcacao!: number;
  embarcacao: Embarcacao = new Embarcacao();
  

  constructor(
    private embarcacaoService: FrontEmbarcacaoService,
    private clienteService: FrontClienteService,
    private router: Router,
    private cepService: CepService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cpfcnpj = this.route.snapshot.params['cpf'];
    this.cliente = new Cliente();
    this.clienteService.consultarClienteCPFCNPJ(this.cpfcnpj).subscribe(
      (data: Cliente) => {
        this.cliente = data;
        console.log('Cliente recebido: ', this.cliente);
        this.embarcacao.cep = this.cliente.cep;
        this.embarcacao.logradouro = this.cliente.logradouro;
        this.embarcacao.numero = this.cliente.numero;
        this.embarcacao.bairro = this.cliente.bairro;
        this.embarcacao.complemento = this.cliente.complemento;
        this.embarcacao.cidade = this.cliente.cidade;
        this.embarcacao.uf = this.cliente.uf;
        
      },
      (error) => {
        console.error('Erro ao consultar cliente: ', error);
      }
    );
    this.embarcacao.tipoEmbarcacao = 'LANCHA';
    this.embarcacao.areaNavegacao = 'INTERIOR';
    this.embarcacao.tipoAtividade = 'ESPORTE LAZER';
    this.embarcacao.tipoPropulsao = 'MOTOR';
    this.embarcacao.qtdTripulantes = 1;
    this.embarcacao.qtdMotores = 1;
    this.embarcacao.numInscricao = '';
  }

  retornar(){
    this.router.navigate(['inicio']);
  }

  confirmCancel() {
    const confirmation = confirm("Você realmente deseja cancelar a operação?");
    if (confirmation) {
        this.retornar();  //Chame a função que lida com a ação de cancelar
    }
}

  onSubmit(){
    //AQUI FOI A CORRECAO DA CARALHA QUE NAO FUNCIONA!!!!!!!!!!
    
    this.embarcacao.id = 0;
    this.embarcacao.cliente = this.cliente;

    console.log('Enviando para backend:', this.embarcacao);
    this.embarcacaoService.cadastrarEmbarcacao(this.embarcacao).subscribe(data => {
      console.log(data);
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['embarcacao/listarembarcacao']);
    });
  }

  buscarEndereco() {
    if (this.embarcacao.cep) {
      this.cepService.buscarCep(this.embarcacao.cep).subscribe(
        dados => {
          if (dados) {
            this.embarcacao.logradouro = dados.logradouro;
            this.embarcacao.bairro = dados.bairro;
            this.embarcacao.uf = dados.uf;
            this.embarcacao.cidade = dados.localidade;
          }
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }
}
