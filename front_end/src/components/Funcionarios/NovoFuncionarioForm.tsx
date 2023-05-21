import { useEffect, useState } from "react";
import { Cargo } from "../../types/cargo";
import { Empresa } from "../../types/empresa";
import SimpleModal from "../Modal";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function NovoFuncionarioForm() {
    const [formValues, setFormValues] = useState({
        nome: "",
        RE: 0,
        empresa: 1,
        cargo: 1,
        status: 1,
        salario: 0,
    });
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [cargos, setCargos] = useState<Cargo[]>([]);

    useEffect(() => {
        const { nome, RE, empresa, cargo, status, salario } = formValues;
        setBtnDisabled(!(nome && RE && empresa && cargo && status && salario));
    }, [formValues]);

    useEffect(() => {
        async function fetchData(url: string, setData: React.Dispatch<any>) {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }

        fetchData(`${API_BASE_URL}/empresas`, setEmpresas);
        fetchData(`${API_BASE_URL}/cargos`, setCargos);
    }, []);

    async function handleSubmit() {
        const { nome, RE, empresa, cargo, status, salario } = formValues;
        const response = await fetch(`${API_BASE_URL}/func`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                RE: Number(RE),
                empresa: Number(empresa),
                cargo: Number(cargo),
                status,
                salario_atual: salario.toFixed(2),
            }),
        });

        const data = await response.json();

        alert(data.message);
    }

    return (
        <SimpleModal
            title="Novo funcionário"
            btn={{
                classes: "btn btn-sm btn-secondary",
                variant: "secondary",
                style: {
                    marginLeft: "1rem",
                },
                text: (
                    <>
                        Novo Funcionario <i className="bi bi-plus-lg"></i>
                    </>
                ),
                saveChanges: handleSubmit,
                afterClose: () => {
                    setFormValues({
                        nome: "",
                        RE: 0,
                        empresa: 1,
                        cargo: 1,
                        status: 1,
                        salario: 0,
                    });
                },
                disabled: btnDisabled,
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
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                nome: e.target.value,
                            }))
                        }
                        value={formValues.nome}
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
                        placeholder="Registro de Empregado"
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                RE: Number(e.target.value),
                            }))
                        }
                        value={formValues.RE}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="empresa" className="form-label">
                        Empresa
                    </label>
                    <select
                        className="form-select"
                        id="empresa"
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                empresa: Number(e.target.value),
                            }))
                        }
                        value={formValues.empresa}
                    >
                        {empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>
                                {empresa.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cargo" className="form-label">
                        Cargo
                    </label>
                    <select
                        className="form-select"
                        id="cargo"
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                cargo: Number(e.target.value),
                            }))
                        }
                        value={formValues.cargo}
                    >
                        {cargos.map((cargo) => (
                            <option key={cargo.id} value={cargo.id}>
                                {cargo.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        className="form-select"
                        id="status"
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                status: Number(e.target.value),
                            }))
                        }
                        value={formValues.status}
                    >
                        <option value={1}>Ativo</option>
                        <option value={2}>Inativo</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="salario" className="form-label">
                        Salário Atual
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="salario"
                        placeholder="Salário atual do funcionário"
                        onChange={(e) =>
                            setFormValues((prevValues) => ({
                                ...prevValues,
                                salario: Number(e.target.value),
                            }))
                        }
                        value={formValues.salario}
                    />
                </div>
            </form>
        </SimpleModal>
    );
}
