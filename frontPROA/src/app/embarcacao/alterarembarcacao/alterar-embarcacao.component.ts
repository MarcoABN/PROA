import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Embarcacao } from 'src/app/model/embarcacao';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-alterar-embarcacao',
  templateUrl: './alterar-embarcacao.component.html',
  styleUrls: ['./alterar-embarcacao.component.css']
})
export class AlterarEmbarcacaoComponent implements OnInit {

  idEmbarcacao!: number;
  embarcacao!: Embarcacao;

  constructor(
    private embarcacaoService: FrontEmbarcacaoService, 
    private cepService: CepService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idEmbarcacao = this.route.snapshot.params['id'];
    this.embarcacao = new Embarcacao();
    this.embarcacaoService.consultarEmbarcacao(this.idEmbarcacao).subscribe(data => {
      this.embarcacao = data;
    });
  }

  retornar() {
    this.router.navigate(['/embarcacao/listarembarcacao']);
  }

  confirmCancel() {
    const confirmation = confirm("Você realmente deseja cancelar a operação?");
    if (confirmation) {
        this.retornar();  //Chame a função que lida com a ação de cancelar
    }
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

  onSubmit() {
    this.embarcacaoService.alterarEmbarcacao(this.idEmbarcacao, this.embarcacao).subscribe(
      data => {
        console.log('Embarcação alterada com sucesso!', data);
        this.router.navigate(['/embarcacao/listarembarcacao']);
      },
      error => {
        console.error('Erro ao alterar embarcação', error);
      }
    );
  }
}
