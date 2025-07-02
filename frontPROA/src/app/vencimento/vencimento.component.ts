import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Cliente } from '../model/cliente';
import { Embarcacao } from '../model/embarcacao';
import { VencimentoService } from '../services/front-vencimento.service';

// Registrar localização brasileira para formatação de moeda
registerLocaleData(localePt);

@Component({
  selector: 'app-vencimentos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vencimento.component.html',
  styleUrls: ['./vencimento.component.css']
})
export class VencimentosComponent implements OnInit {

  vencimentoForm!: FormGroup;
  loading = false;

  // Dados dos resultados
  clientesCha: Cliente[] = [];
  embarcacoesTie: Embarcacao[] = [];
  embarcacoesSeguro: Embarcacao[] = [];
  carregando: boolean = false;

  // Estados de carregamento para cada bloco
  loadingCha = false;
  loadingTie = false;
  loadingSeguro = false;

  constructor(
    private formBuilder: FormBuilder,
    private vencimentoService: VencimentoService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.setDefaultDates();
    this.buscarVencimentos();
  }

  /**
   * Inicializa o formulário com validações
   */
  private initializeForm(): void {
    this.vencimentoForm = this.formBuilder.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }

  /**
   * Define datas padrão (hoje até 30 dias)
   */
  private setDefaultDates(): void {
    const hoje = new Date();
    const umMesDepois = new Date();
    umMesDepois.setMonth(hoje.getMonth() + 1);

    this.vencimentoForm.patchValue({
      dataInicio: hoje.toISOString().split('T')[0],
      dataFim: umMesDepois.toISOString().split('T')[0]
    });
  }

  /**
   * Método principal para buscar todos os tipos de vencimentos
   */
  buscarVencimentos(): void {
    this.carregando = true;

    if (this.vencimentoForm.valid) {
      const { dataInicio, dataFim } = this.vencimentoForm.value;

      this.limparResultados();
      this.executarBuscasVencimentos(dataInicio, dataFim);
    }

    this.carregando = false;
  }

  /**
   * Executa todas as buscas de vencimentos em paralelo
   */
  private executarBuscasVencimentos(dataInicio: string, dataFim: string): void {
    this.buscarVencimentoCha(dataInicio, dataFim);
    this.buscarVencimentoTie(dataInicio, dataFim);
    this.buscarVencimentoSeguro(dataInicio, dataFim);
  }

  /**
   * Busca vencimentos CHA
   */
  private buscarVencimentoCha(dataInicio: string, dataFim: string): void {
    this.loadingCha = true;

    this.vencimentoService.buscarVencimentoCha(dataInicio, dataFim)
      .subscribe({
        next: (clientes) => {
          this.clientesCha = clientes;
          this.loadingCha = false;
        },
        error: (error) => {
          console.error('Erro ao buscar vencimentos CHA:', error);
          this.loadingCha = false;
        }
      });
  }

  /**
   * Busca vencimentos TIE
   */
  private buscarVencimentoTie(dataInicio: string, dataFim: string): void {
    this.loadingTie = true;

    this.vencimentoService.buscarVencimentoTie(dataInicio, dataFim)
      .subscribe({
        next: (embarcacoes) => {
          this.embarcacoesTie = embarcacoes;
          this.loadingTie = false;
        },
        error: (error) => {
          console.error('Erro ao buscar vencimentos TIE:', error);
          this.loadingTie = false;
        }
      });
  }

  /**
   * Busca vencimentos de Seguro
   */
  private buscarVencimentoSeguro(dataInicio: string, dataFim: string): void {
    this.loadingSeguro = true;

    this.vencimentoService.buscarVencimentoSeguro(dataInicio, dataFim)
      .subscribe({
        next: (embarcacoes) => {
          this.embarcacoesSeguro = embarcacoes;
          this.loadingSeguro = false;
        },
        error: (error) => {
          console.error('Erro ao buscar vencimentos de Seguro:', error);
          this.loadingSeguro = false;
        }
      });
  }

  /**
   * Formata data para exibição no formato brasileiro
   */
  formatarData(data: Date | string | undefined): string {
    if (!data) return 'Não informado';

    const dataFormatada = typeof data === 'string' ? new Date(data) : data;
    return dataFormatada.toLocaleDateString('pt-BR');
  }

  /**
   * Limpa todos os resultados das consultas
   */
  limparResultados(): void {
    this.clientesCha = [];
    this.embarcacoesTie = [];
    this.embarcacoesSeguro = [];
  }

  formatarDataVencimento(dataInscricao: any, tipo?: number) {
    if (!dataInscricao) return '';
    const data = new Date(dataInscricao);

    if (tipo) {
      data.setFullYear(data.getFullYear() + 1); // Adiciona 5 anos
    }else {
      data.setFullYear(data.getFullYear() + 5); // Adiciona 5 anos
    }
    // Retorna no mesmo formato da sua função formatarData
    return data.toLocaleDateString('pt-BR'); // ou o formato que você usa
  }
}