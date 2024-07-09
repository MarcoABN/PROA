import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Embarcacao } from 'src/app/model/embarcacao';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';


@Component({
  selector: 'app-listar-embarcacao',
  templateUrl: './listar-embarcacao.component.html',
  styleUrls: ['./listar-embarcacao.component.css']
})
export class ListarEmbarcacaoComponent implements OnInit {

  embarcacoes!: Embarcacao[];
  
  constructor(private embarcacaoService: FrontEmbarcacaoService, private router: Router){}

ngOnInit(): void {
  
this.listarEmbarcacoes();

}

//Chamada para o serviço de listar embarcações
private listarEmbarcacoes(){
  this.embarcacaoService.listarEmbarcacoes().subscribe( data =>{ 
    console.log(data);
    this.embarcacoes = data;
  });
}

alterarEmbarcacao(codigo: number){
  this.router.navigate(['embarcacao/alterar-embarcacao', codigo])
}

cadastrarEmbarcacao(){
  this.router.navigate(['embarcacao/cadastrar-embarcacao'])
}

consultarEmbarcacao(codigo: number){
  this.router.navigate(['embarcacao/consultar-embarcacao', codigo])
}

excluirEmbarcacao(codigo :number){
  if (confirm ("Deseja Excluir a Embarcacao?")){
    this.embarcacaoService.excluirEmbarcacao(codigo).subscribe(data => {
      console.log(data);
      this.listarEmbarcacoes();
    })
  }
}

}
