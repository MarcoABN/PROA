import { Cliente } from "./cliente";

export class Embarcacao {
    //Detalhes da Embarcação
    id!: number;
    nomeEmbarcacao!: string;
    numCasco!: string;
    numInscricao!: string;
    tipoEmbarcacao!: string;
    tipoAtividade!: string;
    areaNavegacao!: string;
    dtConstrucao!: Date;
    dtInscricao!: Date;
    capArmazenamento!: number;
    matCasco!: string;
    qtdTripulantes!: number;
    lotacao!: number;
    tipoPropulsao!: string;
    qtdMotores!: number;
    potenciaMotor!: number;
    matSuperestrutura!: string;
    construtor!: string;
    corPredominante!: string;
    //medidas
    compTotal!: number;
    compPerpendicular!: number;
    arqueacaoBruta!: number;
    arqueacaoLiquida!: number;
    bocaMoldada!: number;
    contorno!: number;
    porteBruto!: string;
    calado!: number;
    pontalMoldado!: number;  
    bordaLivre!: number; 
    //endereço
    logradouro!: string;
    bairro!: string;
    numero!: number;
    complemento!: string;
    uf!: string;
    cidade!: string;
    cep!: string;

    cliente!: Cliente;
    
    //falta incluir demais relações

}


