import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Embarcacao } from 'src/app/model/embarcacao';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cadastrar-embarcacao',
  templateUrl: './cadastrar-embarcacao.component.html',
  styleUrls: ['./cadastrar-embarcacao.component.css']
})
export class CadastrarEmbarcacaoComponent implements OnInit {

  idEmbarcacao!: number;
  embarcacao: Embarcacao = new Embarcacao();

  constructor(
    private embarcacaoService: FrontEmbarcacaoService,
    private router: Router,
    private cepService: CepService
  ){}

  ngOnInit(): void {}

  retornar(){
    this.router.navigate(['inicio']);
  }

  onSubmit(){
    if (!this.embarcacao.nomeEmbarcacao || !this.embarcacao.dtConstrucao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    this.embarcacao.id = 0;

    this.embarcacaoService.cadastrarEmbarcacao(this.embarcacao).subscribe(data => {
      console.log(data);
      this.retornar();
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
