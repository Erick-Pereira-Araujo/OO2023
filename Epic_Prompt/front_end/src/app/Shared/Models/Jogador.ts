import { Heroi } from "./Heroi";
import { UserRole } from "./UserRole";

export interface Jogador {
    idJogador: number;
    nomeJogador: string;
    senha: string;
    heroi: Heroi;
    role: UserRole;
}