import { Funcionario } from "../../types/funcionario"
import EditarFormularioForm from "./EditarFormularioForm"

interface FuncionarioProps {
    funcionario: Funcionario
}

export default function FuncionarioItem({ funcionario } : FuncionarioProps) {

    function formatarSalario(salario: string) {
        return Number(salario).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    return (
        <>
            <tr>
                <td>{funcionario.RE}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo.descricao}</td>
                <td>{funcionario.empresa.nome}</td>
                <td>
                    {formatarSalario(funcionario.salario_atual)}
                </td>
                <td>
                    {formatarSalario(funcionario.salario_anterior)}
                </td>
                <td>
                    <EditarFormularioForm funcionario={funcionario} />
                    <button className="btn btn-danger"
                        onClick={async () => {
                            if (window.confirm("Deseja realmente excluir este funcionário?")) {
                                await fetch(`http://127.0.0.1:8000/api/func/${funcionario.id}`, {
                                    method: "DELETE",
                                })
                            }
                        }}
                    >Excluir <i className="bi bi-trash"></i></button>
                </td>
            </tr>
        </>
    )
}
