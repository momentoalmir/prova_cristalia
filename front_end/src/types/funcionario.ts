import { Cargo } from "./cargo";
import { Empresa } from "./empresa";

export interface Funcionario {
    RE:               number;
    cargo:            Cargo;
    created_at:       Date | null;
    empresa:          Empresa;
    id:               number;
    nome:             string;
    salario_anterior: string;
    salario_atual:    string;
    status:           string;
    updated_at:       Date | null;
}

