import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorcpfcnpjService {

  constructor() { }

  public validarCpfCnpj(cpfCnpj: string): boolean {
    const valor = cpfCnpj.replace(/[^\d]+/g, '');

    if (valor.length === 11) {
      return this.validarCPF(valor);
    } else if (valor.length === 14) {
      return this.validarCNPJ(valor);
    }

    return false;
  }

  private validarCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    return resto === parseInt(cpf.substring(10, 11));
  }

  private validarCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    return resultado === parseInt(digitos.charAt(1));
  }

  mascararCpfCnpj(valor: string): string {
    if (!valor) return '';
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
      // Máscara CPF: xxx.xxx.xxx-xx
      return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    if (apenasNumeros.length === 14) {
      // Máscara CNPJ: xx.xxx.xxx/xxxx-xx
      return apenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    // Retorna original se não bater nenhum caso
    return valor;
  }
}
