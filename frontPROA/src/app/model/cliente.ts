

export class Cliente {

    id!: number;
    nome!: string;
    rg!: string;
    orgEmissor!: string;
    dtEmissao!: Date;
    cpfcnpj!: string;
    //corrigir
    dataNasc!: Date;
    telefone!: string;
    celular!: string;
    email!: string;
    //tratar senha posteriormente
    senha!: string;

    //Dados de endereço
    cep!: string;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    bairro!: string;
    cidade!: string;
    uf!: string;
    
    //Adicionar posterior: relação de classes

    
}