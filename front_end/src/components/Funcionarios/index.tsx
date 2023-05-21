
import { Funcionario } from "../../types/funcionario"
import FuncionarioItem from "./FuncionarioItem"

export default function Funcionarios({ funcionarios } : { funcionarios: Funcionario[] }) {
    return (
        <>
            <h1>Funcionários</h1>
            <p>Lista de Funcionarios</p>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Salário Atual</th>
                            <th>Salário Anterior</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    <h4>Nenhum Funcionário Cadastrado</h4>
                                </td>
                            </tr>
                        )}

                        {funcionarios.map((funcionario) => (
                            <FuncionarioItem key={funcionario.RE} funcionario={funcionario} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
