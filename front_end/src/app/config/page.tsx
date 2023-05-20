'use client'

import Link from 'next/link';
import nookies from 'nookies';
import { useEffect, useState } from "react";

type ParamsType = {
    salario?: string
}

export default function Config() {
    const [salario, setSalario] = useState<string>();
    const cookies = nookies.get(null, 'params');

    useEffect(() => {
        const params: ParamsType = JSON.parse(cookies.params || '{}');
        // Load params
        setSalario(params.salario);
    }, [])

    function onClickSalvar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!salario) {
            alert('Selecione o tipo de salário');
            return;
        }

        // Save params to Cookies
        nookies.set(null, 'params', JSON.stringify({ salario }), {
            maxAge: 30 * 24 * 60 * 60, // 30 days
        });

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
                <Link href="/">
                    <button type="button" className="btn btn-outline-secondary mt-4 mx-2">Voltar</button>
                </Link>
            </form>
        </>
    )
}
