import { useEffect, useState } from "react";
import { Cargo } from "../../types/cargo";
import { Empresa } from "../../types/empresa";
import SimpleModal from "../Modal";

export default function NovoFuncionarioForm() {
    const [nome, setNome] = useState<string>("");
    const [RE, setRe] = useState<number>(0);
    const [empresa, setEmpresa] = useState<number>(1);
    const [cargo, setCargo] = useState<number>(1);
    const [status, setStatus] = useState<number>(1);
    const [salario, setSalario] = useState<number>(0);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [cargos, setCargos] = useState<Cargo[]>([]);

    useEffect(() => {
        if (nome && RE && empresa && cargo && status && salario) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [nome, RE, empresa, cargo, status, salario]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [empresasResponse, cargosResponse] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/empresas"),
                    fetch("http://127.0.0.1:8000/api/cargos"),
                ]);

                const empresasData = await empresasResponse.json();
                const cargosData = await cargosResponse.json();

                setEmpresas(empresasData);
                setCargos(cargosData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        fetchData();
    }, []);

    async function handleSubmit() {
        const response = await fetch("http://127.0.0.1:8000/api/func", {
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
                saveChanges: () => handleSubmit(),
                afterClose: () => {
                    setNome("");
                    setRe(0);
                    setEmpresa(1);
                    setCargo(1);
                    setStatus(1);
                    setSalario(0);
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
                        onChange={(e) => setNome(e.target.value)}
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
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Empresa" className="form-label">
                        Empresa
                    </label>
                    <select
                        className="form-select"
                        onChange={(e) => setEmpresa(parseInt(e.target.value))}
                        value={empresa}
                    >
                        {empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>
                                {empresa.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="Cargo" className="form-label">
                        Cargo
                    </label>
                    <select
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
                            className="form-select"
                            onChange={(e) =>
                                setStatus(parseInt(e.target.value))
                            }
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
                        type="number"
                        className="form-control"
                        id="salario"
                        placeholder="0"
                        onChange={(e) => setSalario(parseInt(e.target.value))}
                    />
                </div>
            </form>
        </SimpleModal>
    );
}
