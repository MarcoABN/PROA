import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from 'src/app/services/front-cliente.service';
import { ValidadorcpfcnpjService } from 'src/app/services/validacao/validadorcpfcnpj.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  Clientes!: Cliente[];
  cpf: string = '';
  cliente!: Cliente | null;
  mensagemErro: string = '';

  constructor(private ClienteService: FrontClienteService, private router: Router, private serviceCpfCnpj: ValidadorcpfcnpjService) { }

  ngOnInit(): void { }



  consultarClientePorCPFCNPJ() {
    if (this.serviceCpfCnpj.validarCpfCnpj(this.cpf)) {
      const cpfcnpj = this.cpf.replace(/[^\d]+/g, '');
      this.ClienteService.consultarClienteCPFCNPJ(cpfcnpj).subscribe(cliente => {
        if (cliente) {
          this.cliente = cliente;
          this.mensagemErro = '';
        }
      }, error => {
        console.error(error);
        this.mensagemErro = 'Cliente não localizado!';
        this.cliente = null;
      });
    }else {
      //Exibe a mensagem de erro se o CPF/CNPJ for inválido
      this.mensagemErro = 'CPF ou CNPJ inválido!';
      this.cliente = null;
    }
  }

  alterarCliente(codigo: number) {
    this.router.navigate(['cliente/alterar-cliente', codigo]);
  }

  cadastrarCliente() {
    this.router.navigate(['cliente/cadastrar-cliente']);
  }

  consultarCliente(codigo: number) {
    this.router.navigate(['cliente/consultar-cliente', codigo]);
  }

  excluirCliente(codigo: number) {
    if (confirm("Deseja Excluir o Cliente?")) {
      this.ClienteService.excluirCliente(codigo).subscribe(data => {
        console.log(data);
        this.cliente = null;
        this.cpf = '';
      });
    }
  }

  limparDados(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.cpf = '';
    this.cliente = null;
    this.mensagemErro = '';
  }
}
