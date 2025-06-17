export class Prestador {
    id!: number;
    nome!: string;
    rg?: string;
    orgEmissor?: string;
    dtEmissao?: Date;
    nacionalidade?: string;
    estadoCivil?: string;
    profissao?: string;
    cpfcnpj!: string;
    telefone?: string;
    celular?: string;
    email?: string;
    senha?: string;
    logradouro?: string;
    bairro?: string;
    numero?: string;
    complemento?: string;
    uf?: string;
    cidade?: string;
    cep?: string;

    estabelecimento?: string;

    cha_numero?: string;
    cha_categoria?: string;
    cha_dtemissao?: Date;
    
    instrutor?: boolean = false;
    procurador?: boolean = false;
    tipoProcuracao?: 'COMPLETO' | 'REDUZIDO' | null = null;
}