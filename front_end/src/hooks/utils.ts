export function formatarSalario(salario: string) {
    return Number(salario).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
}
