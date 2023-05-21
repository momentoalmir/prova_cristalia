import { formatarSalario } from "../../utils/salariesFormats";

import { Funcionario } from "../../types/funcionario";
import { fetchAPI } from "../../utils/api";
import EditarFormularioForm from "./EditarFormularioForm";

interface FuncionarioProps {
    funcionario: Funcionario;
}

export default function FuncionarioItem({ funcionario }: FuncionarioProps) {
    return (
        <>
            <tr>
                <td>{funcionario.RE}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo.descricao}</td>
                <td>{funcionario.empresa.nome}</td>
                <td>{formatarSalario(funcionario.salario_atual)}</td>
                <td>{formatarSalario(funcionario.salario_anterior)}</td>
                <td>
                    <EditarFormularioForm funcionario={funcionario} />
                    <button
                        className="btn btn-danger"
                        onClick={async () => {
                            if (
                                window.confirm(
                                    "Deseja realmente excluir este funcionário?"
                                )
                            ) {
                                await fetchAPI(
                                    `func/${funcionario.id}`,
                                    "DELETE"
                                );
                            }
                        }}
                    >
                        Excluir <i className="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        </>
    );
}
