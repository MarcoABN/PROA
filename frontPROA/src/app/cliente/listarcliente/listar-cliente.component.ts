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
  termoPesquisa: string = '';
  cliente!: Cliente | null;
  clientes: Cliente[] = [];
  mensagemErro: string = '';

  constructor(private ClienteService: FrontClienteService, private router: Router, private serviceCpfCnpj: ValidadorcpfcnpjService) { }

  ngOnInit(): void { }

  /**
   * Detecta automaticamente se o termo digitado é um CPF/CNPJ ou nome
   */
  detectarTipoPesquisa(termo: string): 'cpf' | 'nome' {
    if (!termo) return 'nome';
    
    // Remove espaços e verifica se contém apenas números e alguns caracteres especiais de CPF/CNPJ
    const termoLimpo = termo.trim();
    const regexCpfCnpj = /^[\d\.\-\/\s]+$/;
    
    // Se contém apenas números e caracteres de formatação de CPF/CNPJ
    if (regexCpfCnpj.test(termoLimpo)) {
      const apenasNumeros = termoLimpo.replace(/[^\d]/g, '');
      // CPF tem 11 dígitos, CNPJ tem 14 dígitos
      if (apenasNumeros.length >= 10) {
        return 'cpf';
      }
    }
    
    return 'nome';
  }

  /**
   * Retorna o tipo de pesquisa detectado para exibição na interface
   */
  getTipoPesquisaDetectado(): string {
    const tipo = this.detectarTipoPesquisa(this.termoPesquisa);
    return tipo === 'cpf' ? 'CPF/CNPJ' : 'Nome';
  }

  /**
   * Verifica se o termo digitado é válido para pesquisa
   */
  isTermoValido(): boolean {
    if (!this.termoPesquisa || !this.termoPesquisa.trim()) {
      return false;
    }

    const tipo = this.detectarTipoPesquisa(this.termoPesquisa);
    
    if (tipo === 'cpf') {
      // Para CPF/CNPJ, deve ter pelo menos 10 números
      const apenasNumeros = this.termoPesquisa.replace(/[^\d]/g, '');
      return apenasNumeros.length >= 10;
    } else {
      // Para nome, deve ter pelo menos 2 caracteres
      return this.termoPesquisa.trim().length >= 2;
    }
  }

  /**
   * Consulta cliente por CPF/CNPJ
   */
  consultarClientePorCPFCNPJ() {
    const cpfcnpjLimpo = this.termoPesquisa.replace(/[^\d]/g, '');
    
    if (this.serviceCpfCnpj.validarCpfCnpj(this.termoPesquisa)) {
      this.ClienteService.consultarClienteCPFCNPJ(cpfcnpjLimpo).subscribe(cliente => {
        if (cliente) {
          this.cliente = cliente;
          this.clientes = [];
          this.mensagemErro = '';
        }
      }, error => {
        console.error(error);
        this.mensagemErro = 'Cliente não localizado!';
        this.cliente = null;
        this.clientes = [];
      });
    } else {
      this.mensagemErro = 'CPF ou CNPJ inválido!';
      this.cliente = null;
      this.clientes = [];
    }
  }

  /**
   * Consulta clientes por nome
   */
  consultarClientesPorNome() {
    const nomeTrimmed = this.termoPesquisa.trim();
    
    if (nomeTrimmed.length >= 2) {
      this.ClienteService.consultarClientesPorNome(nomeTrimmed).subscribe(clientes => {
        if (clientes && clientes.length > 0) {
          this.clientes = clientes;
          this.cliente = null;
          this.mensagemErro = '';
        } else {
          this.mensagemErro = 'Nenhum cliente encontrado com esse nome!';
          this.clientes = [];
          this.cliente = null;
        }
      }, error => {
        console.error(error);
        this.mensagemErro = 'Nenhum cliente encontrado com esse nome!';
        this.clientes = [];
        this.cliente = null;
      });
    } else {
      this.mensagemErro = 'Digite pelo menos 2 caracteres para pesquisar por nome!';
      this.clientes = [];
      this.cliente = null;
    }
  }

  /**
   * Método principal de pesquisa que detecta automaticamente o tipo
   */
  pesquisar() {
    if (!this.isTermoValido()) {
      this.mensagemErro = 'Digite um termo válido para pesquisa!';
      return;
    }

    // Limpa resultados anteriores
    this.mensagemErro = '';
    this.cliente = null;
    this.clientes = [];

    const tipoPesquisa = this.detectarTipoPesquisa(this.termoPesquisa);
    
    if (tipoPesquisa === 'cpf') {
      this.consultarClientePorCPFCNPJ();
    } else {
      this.consultarClientesPorNome();
    }
  }

  /**
   * Aplica máscara dinâmica para CPF/CNPJ
   */
  aplicarMascaraCpfCnpj(valor: string): string {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    if (apenasNumeros.length <= 11) {
      // Máscara de CPF: xxx.xxx.xxx-xx
      return apenasNumeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // Máscara de CNPJ: xx.xxx.xxx/xxxx-xx
      return apenasNumeros
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  }

  /**
   * Verifica se o caractere digitado é número
   */
  isNumero(char: string): boolean {
    return /\d/.test(char);
  }

  /**
   * Controla quais teclas podem ser pressionadas
   */
  onKeyPress(event: KeyboardEvent) {
    const char = event.key;
    
    // Permite teclas de controle (backspace, delete, tab, etc.)
    if (event.ctrlKey || event.metaKey || 
        ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(char)) {
      return;
    }

    // Se já tem letras no campo, permite qualquer caractere
    if (this.termoPesquisa && /[a-zA-ZÀ-ÿ]/.test(this.termoPesquisa)) {
      return;
    }

    // Se está digitando números, permite apenas números
    if (this.isNumero(char)) {
      return;
    }

    // Se está digitando letra e o campo está vazio ou só tem números, permite
    if (/[a-zA-ZÀ-ÿ\s]/.test(char)) {
      return;
    }

    // Bloqueia caracteres especiais se não forem de formatação
    event.preventDefault();
  }

  /**
   * Chamado quando o usuário digita no campo de pesquisa
   */
  onTermoPesquisaChange(event: any) {
    let valor = event.target.value;
    
    // Limpa mensagens de erro ao digitar
    if (this.mensagemErro) {
      this.mensagemErro = '';
    }

    // Se o valor contém apenas números e caracteres de formatação, aplica máscara
    if (valor && /^[\d\.\-\/\s]*$/.test(valor)) {
      const valorFormatado = this.aplicarMascaraCpfCnpj(valor);
      
      // Só atualiza se houve mudança para evitar loop
      if (valorFormatado !== valor) {
        this.termoPesquisa = valorFormatado;
        
        // Atualiza o campo input diretamente
        setTimeout(() => {
          event.target.value = valorFormatado;
        }, 0);
      }
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
        // Remove o cliente da lista se for pesquisa por nome
        if (this.clientes.length > 0) {
          this.clientes = this.clientes.filter(c => c.id !== codigo);
        } else {
          this.cliente = null;
        }
        this.termoPesquisa = '';
      });
    }
  }

  limparDados(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.termoPesquisa = '';
    this.cliente = null;
    this.clientes = [];
    this.mensagemErro = '';
  }
}