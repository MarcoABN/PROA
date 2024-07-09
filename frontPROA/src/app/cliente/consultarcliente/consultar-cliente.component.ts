import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontClienteService } from 'src/app/services/front-cliente.service';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit {

  idCliente!: number;
  cliente!: Cliente;

  constructor(
    private clienteService: FrontClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
    this.cliente = new Cliente();
    this.clienteService.consultarCliente(this.idCliente).subscribe(data => {
      this.cliente = data;
    });
  }

  retornar() {
    this.router.navigate(['/cliente/listar-cliente']);
  }

}
