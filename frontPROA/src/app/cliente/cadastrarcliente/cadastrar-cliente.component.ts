import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from 'src/app/services/front-cliente.service';
import { CepService } from 'src/app/services/cep.service';
import { FormsModule } from '@angular/forms';
import { ValidadorcpfcnpjService } from 'src/app/services/validacao/validadorcpfcnpj.service';


@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  idCliente!: number;
  cliente: Cliente = new Cliente();
  mensagemErro: string = '';

  constructor(
    private ClienteService: FrontClienteService,
    private router: Router,
    private cepService: CepService,
    private serviceCpfCnpj: ValidadorcpfcnpjService
  ){}

  ngOnInit(): void {}

  retornar(){
    this.router.navigate(['inicio']);
  }

  confirmCancel() {
    const confirmation = confirm("Você realmente deseja cancelar a operação?");
    if (confirmation) {
        this.retornar();  //Chame a função que lida com a ação de cancelar
    }
}


onSubmit() {
  if (!this.cliente.nome) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!this.serviceCpfCnpj.validarCpfCnpj(this.cliente.cpfcnpj)){
    alert('CPF ou CNPJ inválido!');
  }

  if (this.serviceCpfCnpj.validarCpfCnpj(this.cliente.cpfcnpj)) {

  this.cliente.id = 0;
  this.cliente.cpfcnpj = this.cliente.cpfcnpj.replace(/[^\d]+/g, '');
  
  this.ClienteService.cadastrarCliente(this.cliente).subscribe(
    data => {
      alert("Cadastro realizado com sucesso!");
      this.retornar();
    },
    error => {
      if (error.error && error.error.message && error.error.message.includes("duplicate key value violates unique constraint \"cpfcnpj\"")) {
        alert("O CPF/CNPJ informado já está cadastrado.");
      } else {
        alert("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
      }
      console.error("Erro ao cadastrar cliente: ", error);
    }
  );

}

}



  buscarEndereco() {
    if (this.cliente.cep) {
      this.cepService.buscarCep(this.cliente.cep).subscribe(
        dados => {
          if (dados) {
            this.cliente.logradouro = dados.logradouro;
            this.cliente.bairro = dados.bairro;
            this.cliente.uf = dados.uf;
            this.cliente.cidade = dados.localidade;
          }
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }
}
