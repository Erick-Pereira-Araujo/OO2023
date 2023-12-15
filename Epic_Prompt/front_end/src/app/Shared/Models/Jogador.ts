import { Heroi } from "./Heroi";

export interface Jogador {
    idJogador: number;
    nomeJogador: string;
    senha: string;
    heroi: Heroi;
    loginStatus: boolean;
}