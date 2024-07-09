import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontEmbarcacaoService } from 'src/app/services/front-embarcacao.service';
import { Embarcacao } from 'src/app/model/embarcacao';

@Component({
  selector: 'app-consultar-embarcacao',
  templateUrl: './consultar-embarcacao.component.html',
  styleUrls: ['./consultar-embarcacao.component.css']
})
export class ConsultarEmbarcacaoComponent {

  idEmbarcacao! :number;
  embarcacao! : Embarcacao;

  constructor (private embarcacaoService :FrontEmbarcacaoService, private router :Router, private route: ActivatedRoute){}

  ngOnInit() :void{
    this.idEmbarcacao = this.route.snapshot.params['id'];
    this.embarcacao = new Embarcacao();
    this.embarcacaoService.consultarEmbarcacao(this.idEmbarcacao).subscribe (data=> {
      this.embarcacao = data;
      
    });
  }

  retornar(){
    this.router.navigate(['/embarcacao/listarembarcacao']);
  }

}
