import { useEffect, useState } from "react";

type ParamsType = {
    salario?: string
}

export const getConfigParams = () => {
    const localStorage = window.localStorage;
    const params: ParamsType = JSON.parse(localStorage.getItem('params') || '{}');
    return params;
}

export const setConfigParams = (params: ParamsType) => {
    const localStorage = window.localStorage;
    localStorage.setItem('params', JSON.stringify(params));
}

export default function Config() {
    const [salario, setSalario] = useState<string>();

    useEffect(() => {
        // Load params
        const params: ParamsType = getConfigParams();
        setSalario(params?.salario || 'salario_atual');
    }, [])

    function onClickSalvar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!salario) {
            alert('Selecione o tipo de salário');
            return;
        }

        setConfigParams({ salario });

        alert('Parâmetros salvos com sucesso!');
    }

    return (
        <>
            <h1>Paramêtros</h1>

            <h3 className="mt-4">Relatório</h3>

            <p>Escolha o tipo de Salário para ser calculado nos relatórios</p>

            <form onSubmit={onClickSalvar}>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="salario" id="salario_atual"
                        onChange={(e) => setSalario('salario_atual')}
                        checked={salario === 'salario_atual'}
                    />

                    <label className="form-check-label" htmlFor="salario_atual">
                        Salário Atual
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="salario" id="salario_anterior"
                        onChange={(e) => setSalario('salario_anterior')}
                        checked={salario === 'salario_anterior'}
                    />
                    <label className="form-check-label" htmlFor="salario_anterior">
                        Salário Anterior
                    </label>
                </div>

                <button className="btn btn-primary mt-4">Salvar</button>
                <a href="/">
                    <button type="button" className="btn btn-outline-secondary mt-4 mx-2">Voltar</button>
                </a>
            </form>
        </>
    )
}
