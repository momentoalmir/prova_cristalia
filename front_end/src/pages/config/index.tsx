import { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";

type ParamsType = {
    salario?: string;
};

export const getConfigParams = () => {
    const localStorage = window.localStorage;
    const params: ParamsType = JSON.parse(
        localStorage.getItem("params") || "{}"
    );
    return params;
};

export const setConfigParams = (params: ParamsType) => {
    const localStorage = window.localStorage;
    localStorage.setItem("params", JSON.stringify(params));
};

export default function Config() {
    const [salario, setSalario] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>("none");
    const [errorMessage, setErrorMessage] = useState<string>("none");

    useEffect(() => {
        // Load params
        const params: ParamsType = getConfigParams();
        setSalario(params?.salario || "salario_atual");
    }, []);

    function onClickSalvar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!salario) {
            setErrorMessage("block");
            setTimeout(() => {
                setErrorMessage("none");
            }, 10000);
            return;
        }

        setConfigParams({ salario });

        setErrorMessage("none");
        setSuccessMessage("block");
        setTimeout(() => {
            setSuccessMessage("none");
        }, 10000);
    }

    return (
        <>
            <h1>Paramêtros</h1>

            <h3 className="mt-4">Relatório</h3>

            <p>Escolha o tipo de Salário para ser calculado nos relatórios</p>

            <form onSubmit={onClickSalvar}>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="salario"
                        id="salario_atual"
                        onChange={() => setSalario("salario_atual")}
                        checked={salario === "salario_atual"}
                    />

                    <label className="form-check-label" htmlFor="salario_atual">
                        Salário Atual
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="salario"
                        id="salario_anterior"
                        onChange={() => setSalario("salario_anterior")}
                        checked={salario === "salario_anterior"}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="salario_anterior"
                    >
                        Salário Anterior
                    </label>
                </div>

                <button className="btn btn-primary mt-4">Salvar</button>
                <a href="/">
                    <button
                        type="button"
                        className="btn btn-outline-secondary mt-4 mx-2"
                    >
                        Voltar
                    </button>
                </a>
            </form>

            <div className="form-messages">
                <Alert
                    key={1}
                    variant="success"
                    style={{ display: successMessage }}
                    className="mt-4"
                >
                    <p>Parâmetros salvos com sucesso!</p>
                </Alert>

                <Alert
                    key={2}
                    variant="danger"
                    style={{ display: errorMessage }}
                    className="mt-4"
                >
                    <p>Erro ao salvar os parâmetros!</p>
                </Alert>
            </div>
        </>
    );
}
