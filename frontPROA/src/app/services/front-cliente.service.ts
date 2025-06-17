import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Cliente } from '../model/cliente';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class FrontClienteService {

  //private url = "http://localhost:8080/ccliente/cliente";
  //public http://3.214.105.13:8080/

  private url = `${AppConfig.API_BASE_URL}/ccliente/cliente`;  //"http://3.214.105.13:8080/ccliente/cliente";
  private url2 = `${AppConfig.API_BASE_URL}/ccliente/cpfcnpj`; //"http://3.214.105.13:8080/ccliente/cpfcnpj";
  private url3 = `${AppConfig.API_BASE_URL}/ccliente/representantes`; //"http://3.214.105.13:8080/ccliente/representantes";

  constructor(private httpClient: HttpClient) { }

   //Listar Clientes a partir do metodo API REST que tem na URL acima
   listarClientes(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.url}`)
  }

  //Serviço para consulta do Cliente
  consultarCliente(IDCliente: number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.url}/${IDCliente}`);
  }

  //Consultar por CPFCNPJ
  consultarClienteCPFCNPJ(CPFCNPJ: string): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.url2}/${CPFCNPJ}`);
  }

  //Servico para incluir uma Cliente
  cadastrarCliente(cliente: Cliente): Observable<object>{
    return this.httpClient.post(`${this.url}`, cliente);
  }

  //Servico para Alterar uma Cliente
  alterarCliente(IDCliente: number, cliente: Cliente): Observable<Object>{
    console.log("Teste: ", cliente.dtEmissao);
    return this.httpClient.put(`${this.url}/${IDCliente}`, cliente);
  }

  //Servico para Excluir uma Cliente
  excluirCliente(IDCliente: number): Observable<Object>{
    return this.httpClient.delete<Cliente>(`${this.url}/${IDCliente}`);

  }

  //Consultar por CPFCNPJ
  consultarRepresentantes(idEmpresa: number): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.url3}/${idEmpresa}`);
  }

   // Novo método para consultar por nome (busca parcial)
  consultarClientesPorNome(nome: string): Observable<Cliente[]> {
    const params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Cliente[]>(`${this.url}/buscar-por-nome`, { params });
  }
  

}