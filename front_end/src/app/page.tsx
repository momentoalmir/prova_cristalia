import Funcionarios from "@/components/Funcionarios";
import { Funcionario } from "@/types/funcionario";
import Link from "next/link";
import nookies from 'nookies';


export default async function Home() {
  const funcionarios: Funcionario[] = [];

  const cookies = nookies.get(null, 'params');
  const params: { salario: string } = JSON.parse(cookies.params || '{}');

  // function totalSalarios() {
  //   const salario = params?.salario === 'salario_atual' ? 'salario_atual' : 'salario_anterior';
  //   return funcionarios.reduce((acc: any, funcionario: { [x: string]: any; }) => acc + funcionario[salario], 0)
  // }



  return (
    <div className="row">
      <div
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group">
            <Link href="/config">
              <button type="button" className="btn btn-sm btn-outline-secondary">Configurar Parâmetros</button>
            </Link>

            <button type="button" className="btn btn-sm btn-outline-secondary">Ajustar Salários</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Gerar Relatório</button>
            <button type="button" className="btn btn-sm btn-secondary" style={{ marginLeft: '1rem' }}>Novo Funcionario</button>
          </div>
        </div>
      </div>

      {/* @ts-ignore */}
      <Funcionarios funcionarios={funcionarios} />
    </div>
  )
}
