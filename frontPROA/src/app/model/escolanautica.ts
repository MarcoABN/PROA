import { Prestador } from "./prestador";

export class Escolanautica {

    id!: number;
    razaoSocial! : string;
    cnpj!: string;

    instrutor?: Prestador;
    responsavel?: Prestador;

}
