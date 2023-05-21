import { useEffect, useState } from "react";

import AjusteSalario from "../../components/AjusteSalario";
import Funcionarios from "../../components/Funcionarios";
import SimpleModal from "../../components/Modal";

import { useInterval } from "usehooks-ts";
import NovoFuncionarioForm from "../../components/Funcionarios/NovoFuncionarioForm";
import { Funcionario } from "../../types/funcionario";
import { fetchAPI } from "../../utils/api";
import { formatarSalario } from "../../utils/salariesFormats";
import { getConfigParams } from "../config";

export default function Home() {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [ajustarVisible, setAjustarVisible] = useState<boolean>(false);

    const [relatorioSalario, setRelatorioSalario] = useState<RelatorioSalario>({
        totalSalarios: 0,
        totalFuncionarios: 0,
        tipoSalario: "",
    });

    async function getFuncionarios() {
        const data = await fetchAPI("func");
        return data;
    }

    useEffect(() => {
        getFuncionarios().then((data) => setFuncionarios(data));
    }, []);

    useInterval(() => {
        getFuncionarios().then((data) => setFuncionarios(data));
    }, 5000);

    async function gerarRelatorio() {
        const config = getConfigParams();

        const data: RelatorioSalario = await fetchAPI(
            `total/${config.salario}`
        );

        setRelatorioSalario({
            totalSalarios: data.totalSalarios,
            totalFuncionarios: data.totalFuncionarios,
            tipoSalario:
                config.salario === "salario_atual"
                    ? "Salário Atual"
                    : "Salário Anterior",
        });
    }

    return (
        <div className="row">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group" style={{ alignItems: "center" }}>
                        <a
                            href="/config"
                            className="btn btn-sm btn-outline-secondary"
                        >
                            Configurar Parâmetros
                        </a>

                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() =>
                                    setAjustarVisible(!ajustarVisible)
                                }
                            >
                                Ajustar Salário
                            </button>
                        </div>

                        <SimpleModal
                            title="Gerar Relatório"
                            btn={{
                                classes: "btn-sm",
                                variant: "outline-secondary",
                                text: "Gerar Relatório",
                                beforeOpen: () => gerarRelatorio(),
                            }}
                        >
                            Total de salários:{" "}
                            {formatarSalario(
                                relatorioSalario.totalSalarios.toFixed(2)
                            )}
                            <br />
                            Total de funcionários:{" "}
                            {relatorioSalario.totalFuncionarios} <br />
                            Tipo de salário: {relatorioSalario.tipoSalario}
                        </SimpleModal>

                        <NovoFuncionarioForm />
                    </div>
                </div>
            </div>

            {ajustarVisible && <AjusteSalario />}

            {/* @ts-ignore */}
            <Funcionarios funcionarios={funcionarios} />
        </div>
    );
}
