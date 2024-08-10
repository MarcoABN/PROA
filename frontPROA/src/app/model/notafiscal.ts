import { Embarcacao } from "./embarcacao";


export class Notafiscal {

    id!: number;
    cnpjvendedor!: string;
    razaoSocial!: string;
    dtVenda!: Date;
    local!: string;
    numeroNotaFiscal!: string;

    embarcacao!: Embarcacao;

    pdfPath!: string;
}
