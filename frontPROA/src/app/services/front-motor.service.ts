import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motor } from '../model/motor';

@Injectable({
  providedIn: 'root'
})
export class FrontMotorService {

  private url = "http://localhost:8080/cmotor/motor";

  constructor(private httpClient: HttpClient) { }

  //Listar Embarcacoes a partir do metodo API REST que tem na URL acima
  listarMotor(): Observable<Motor[]>{
    return this.httpClient.get<Motor[]>(`${this.url}`)
  }

  //Serviço para consulta da Motor
  consultarMotor (idMotor: number): Observable<Motor>{
    
    return this.httpClient.get<Motor>(`${this.url}/${idMotor}`)
  }

  //Servico para incluir uma Motor
  incluirMotor(motor: Motor): Observable<object>{
    return this.httpClient.post(`${this.url}`, motor);
  }

  //Servico para Alterar uma Motor
  alterarMotor(IDMotor: number, motor: Motor): Observable<object>{
    return this.httpClient.put(`${this.url}/${IDMotor}`, motor);
  }

  //Servico para Excluir uma Motor
  excluirMotor(IDMotor: number): Observable<Object>{
    return this.httpClient.delete<Motor>(`${this.url}/${IDMotor}`);
  }
}
 