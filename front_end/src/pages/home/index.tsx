import { useEffect, useState } from "react";

import AjusteSalario from "../../components/AjusteSalario";
import Funcionarios from "../../components/Funcionarios";
import { Funcionario } from "../../types/funcionario";

export default function Home() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [ajustarVisible, setAjustarVisible] = useState<boolean>(false);

  async function getFuncionarios() {
    const response = await fetch("http://127.0.0.1:8000/api/func");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getFuncionarios().then((data) => setFuncionarios(data));

    setInterval(() => {
      getFuncionarios().then((data) => setFuncionarios(data));
    }, 5000);
  }, []);

  return (
    <div className="row">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group">
            <a href="/config">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Configurar Parâmetros
              </button>
            </a>

            <button type="button" className={
              ajustarVisible ? "btn btn-sm btn-secondary" : "btn btn-sm btn-outline-secondary"
            } onClick={(e) => setAjustarVisible(!ajustarVisible)}>
              Ajustar Salários
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Gerar Relatório
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              style={{ marginLeft: "1rem" }}
            >
              Novo Funcionario <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {ajustarVisible && (
        <AjusteSalario />
      )}

      {/* @ts-ignore */}
      <Funcionarios funcionarios={funcionarios} />
    </div>
  );
}
