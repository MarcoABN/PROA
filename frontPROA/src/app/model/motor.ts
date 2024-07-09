import { Embarcacao } from "./embarcacao";



export class Motor {

    idMotor!: number;
    fabricante!: string;
    modelo!: string;
    numSerie!: string;
    tipo!: boolean;
    combustivel!: number;
    dtFabMot!: Date;

    embarcacao!: Embarcacao;
}


