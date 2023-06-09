import { FormEvent, useState } from "react";
import { fetchAPI } from "../../utils/api";

export default function AjusteSalario() {
    const [percentual, setPercentual] = useState<number>(0);
    const [bonus, setBonus] = useState<number>(0);

    async function onSubmitSalario(e: FormEvent) {
        e.preventDefault();

        if (percentual === 0 && bonus === 0) {
            alert("Informe o percentual ou o bônus");
            return;
        }

        const data = await fetchAPI(`ajuste/${percentual}/${bonus}`, "POST");

        if (data.error) {
            alert(data.error);
            return;
        }

        alert(data.message);
    }

    return (
        <>
            <h2>Ajustar Salário</h2>
            <p>
                Selecione o percentual e bónus a ser ajustado nos{" "}
                {localStorage.getItem("params") ===
                '{"salario":"salario_atual"}'
                    ? "salários atuais"
                    : "salários anteriores"}
            </p>

            <form method="post" onSubmit={onSubmitSalario}>
                <div className="form-group">
                    <label htmlFor="percentual">Percentual (%)</label>
                    <input
                        type="number"
                        className="form-control mt-2"
                        id="percentual"
                        placeholder="0"
                        onChange={(e) => setPercentual(Number(e.target.value))}
                    />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="bonus">Bônus</label>
                    <input
                        type="number"
                        className="form-control mt-2"
                        id="bonus"
                        placeholder="0"
                        onChange={(e) => setBonus(Number(e.target.value))}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-4">
                    Ajustar
                </button>
            </form>
        </>
    );
}
