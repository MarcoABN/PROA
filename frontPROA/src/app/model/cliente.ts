

export class Cliente {

    id!: number;
    nome!: string;
    rg!: string;
    orgEmissor!: string;
    dtEmissao!: Date;
    cpfcnpj!: string;
    nacionalidade!: string;
    naturalidade?: string;
    dataNasc!: Date;
    telefone?: string;
    celular?: string;
    email?: string;
    //tratar senha posteriormente
    senha!: string;

    //Dados de endereço
    cep!: string;
    logradouro!: string;
    numero!: number;
    complemento?: string;
    bairro!: string;
    cidade!: string;
    uf!: string;
    
    cha_numero?: string;
    cha_categoria?: string;
    cha_dtemissao?: Date;
    
}