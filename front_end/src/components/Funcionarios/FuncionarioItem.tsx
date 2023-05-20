interface FuncionarioProps {
    funcionario: {
        RE: number,
        nome: string,
        cargo: {
            descricao: string
        },
        salario_atual: number,
        salario_anterior: number
    }
}

export default function FuncionarioItem({ funcionario } : FuncionarioProps) {

    return (
        <>
            <tr>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo.descricao}</td>
                <td>
                    {Number(funcionario.salario_atual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                    {Number(funcionario.salario_anterior).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                    <button className="btn btn-primary m-2">Editar <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger">Excluir <i className="bi bi-trash"></i></button>
                </td>
            </tr>
        </>
    )
}
