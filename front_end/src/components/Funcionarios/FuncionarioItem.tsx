import { Funcionario } from "../../types/funcionario"


interface FuncionarioProps {
    funcionario: Funcionario
}

export default function FuncionarioItem({ funcionario } : FuncionarioProps) {
    return (
        <>
            <tr>
                <td>{funcionario.RE}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo.descricao}</td>
                <td>{funcionario.empresa.nome}</td>
                <td>
                    {Number(funcionario.salario_atual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                    {Number(funcionario.salario_anterior).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                    <button className="btn btn-primary m-2">Editar <i className="bi bi-pencil-square"></i></button>
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
