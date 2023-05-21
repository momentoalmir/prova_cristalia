import React, { useEffect, useState } from "react";
import { Cargo } from "../../types/cargo";

import { Funcionario } from "../../types/funcionario";
import { fetchAPI } from "../../utils/api";
import SimpleModal from "../Modal";

const EditarFormularioForm = React.memo(
    ({ funcionario }: { funcionario: Funcionario }) => {
        const [nome, setNome] = useState<string>("");
        const [RE, setRe] = useState<number>(0);

        const [cargo, setCargo] = useState<number>(1);
        const [status, setStatus] = useState<string>("A");
        const [salario, setSalario] = useState<string>("0.00");
        const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

        const [cargos, setCargos] = useState<Cargo[]>([]);

        useEffect(() => {
            if (nome && RE && cargo && status && salario) {
                setBtnDisabled(false);
            } else {
                setBtnDisabled(true);
            }
        }, [nome, RE, cargo, status, salario]);

        useEffect(() => {
            async function getCargos() {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cargos"
                );
                const data = await response.json();
                setCargos(data);
            }

            getCargos();
        }, []);

        return (
            <SimpleModal
                title="Editar Funcionário"
                btn={{
                    classes: "m-2",
                    variant: "primary",
                    style: { marginLeft: "1rem" },
                    text: (
                        <>
                            Editar <i className="bi bi-pencil-square"></i>
                        </>
                    ),
                    beforeOpen: () => {
                        setNome(funcionario.nome);
                        setRe(funcionario.RE);
                        setCargo(funcionario.cargo.id);
                        setStatus(funcionario.status);
                        setSalario(
                            Number(funcionario.salario_atual).toFixed(2)
                        );
                    },
                    disabled: btnDisabled,
                    saveChanges: async () => {
                        await fetchAPI(`func/${funcionario.id}`, "PUT", {
                            nome,
                            RE: Number(RE),
                            cargo: Number(cargo),
                            status,
                            salario_atual: salario,
                        });
                    },
                }}
            >
                <form>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Nome do funcionário"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="re" className="form-label">
                            RE
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="re"
                            placeholder="0"
                            onChange={(e) => setRe(parseInt(e.target.value))}
                            value={RE}
                            disabled={true}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cargo" className="form-label">
                            Cargo
                        </label>
                        <select
                            id="cargo"
                            className="form-select"
                            onChange={(e) => setCargo(parseInt(e.target.value))}
                            value={cargo}
                        >
                            {cargos.map((cargo) => (
                                <option key={cargo.id} value={cargo.id}>
                                    {cargo.descricao}
                                </option>
                            ))}
                        </select>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                className="form-select"
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                            >
                                <option value="A">Ativo</option>
                                <option value="D">Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salario" className="form-label">
                            Salário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="salario"
                            placeholder="0"
                            onChange={(e) => setSalario(e.target.value)}
                            value={salario}
                        />
                    </div>
                </form>
            </SimpleModal>
        );
    }
);

export default EditarFormularioForm;
