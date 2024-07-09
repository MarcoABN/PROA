import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { FrontClienteService } from 'src/app/services/front-cliente.service';


@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  Clientes!: Cliente[];
  
  constructor(private ClienteService: FrontClienteService, private router: Router){}

ngOnInit(): void {
  
this.listarClientes();

}

//Chamada para o serviço de listar clientes
private listarClientes(){
  this.ClienteService.listarClientes().subscribe( data =>{ 
    console.log(data);
    this.Clientes = data;
  });
}

alterarCliente(codigo: number){
  this.router.navigate(['cliente/alterar-cliente', codigo])
}

cadastrarCliente(){
  this.router.navigate(['cliente/cadastrar-cliente'])
}

consultarCliente(codigo: number){
  this.router.navigate(['cliente/consultar-cliente', codigo])
}

excluirCliente(codigo :number){
  if (confirm ("Deseja Excluir o Cliente?")){
    this.ClienteService.excluirCliente(codigo).subscribe(data => {
      console.log(data);
      this.listarClientes();
    })
  }
}

}