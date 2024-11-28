import { Component, OnInit } from '@angular/core';
import { FrontMotorService } from '../services/front-motor.service';
import { Motor } from '../model/motor';
import { Embarcacao } from '../model/embarcacao';
import { Cliente } from '../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontEmbarcacaoService } from '../services/front-embarcacao.service';

@Component({
  selector: 'app-manter-motor',
  templateUrl: './manter-motor.component.html',
  styleUrls: ['./manter-motor.component.css']
})
export class ManterMotorComponent implements OnInit {
  cliente: Cliente = new Cliente();
  embarcacao: Embarcacao = new Embarcacao();
  idEmbarcacao!: number;
  motores: Motor[] = [];
  novoMotor: Motor = new Motor();

  constructor(
    private motorService: FrontMotorService, 
    private router: Router, 
    private route: ActivatedRoute,
    private embarcacaoService: FrontEmbarcacaoService
  ) {}

  ngOnInit(): void {

    //Falta definir dinamicamente a embarcação passada
    this.idEmbarcacao = this.route.snapshot.params['id'];
    this.embarcacao = new Embarcacao();
    this.embarcacaoService.consultarEmbarcacao(this.idEmbarcacao).subscribe(data => {
      this.embarcacao = data;
    this.cliente.nome = this.embarcacao.cliente.nome;
    });

    console.log(this.embarcacao.cliente);

    //Carregar os motores quando esse componente for inicializado
    this.carregarMotores();
  }

  carregarMotores() {
    this.motorService.listarMotorPorEmbarcacao(this.idEmbarcacao).subscribe(motores => {
      this.motores = motores;
      //console.log('TESTE MOTOR', this.motores[0].id, this.motores[0].marca);
    }, error => {
      console.error('Erro ao carregar motores', error);
      
    });
  }
  

  excluirMotor(idMotor: number) {
    if (idMotor) {
      this.motorService.excluirMotor(idMotor).subscribe(() => {
        alert('Motor excluído com sucesso!');
        location.reload();
        this.carregarMotores(); // Atualiza a lista de motores
      }, error => {
        console.error('Erro ao excluir motor', error);
        alert('Erro ao excluir motor');
      });
    } else {
      console.error('ID do motor está indefinido');
      alert('Erro: ID do motor está indefinido');
    }
  }
  

  adicionarMotor() {
    this.novoMotor.embarcacao = this.embarcacao; // Definindo a embarcação ao novo motor
    this.motorService.incluirMotor(this.novoMotor).subscribe(() => {
      alert('Motor adicionado com sucesso!');
      this.novoMotor = new Motor(); // Limpar o formulário
      this.carregarMotores(); // Atualiza a lista de motores
    }, error => {
      console.error('Erro ao adicionar motor', error);
      alert('Erro ao adicionar motor');
    });
  }
}
