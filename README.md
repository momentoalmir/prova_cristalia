# Prova Cristália de Sistemas

# 1 - Teste de Lógica

Fazer utilizando ferramentas/linguagens Web uma solução para o atendimento do requisito
abaixo:

Aplicar xx % de correção no Salário Atual.
Para salários inferiores a R$ 1500,00 aplicar a correção e acrescentar um bônus de R$ xxx,xx.


| Nome           | Cargo      | Salário Atual | Salário Anterior |
|----------------|------------|--------------|------------------|
| Maria Aparecida| Copeira    | 1000         | 988              |
| Jose Benedito  | Porteiro   | 1250         | 1117             |
| Joao Pedro     | Analista   | 1754         | 1500             |
| Joaquina Maria | Diretor    | 3400         | 3000             |
| Ana Rosa       | Operador   | 2100         | 1800             |
| Benedito Pedro | Auxiliar   | 1000         | 980              |

# 2 - Teste Complementar

Aproveitando o exercício (1), crie um botão na tela que ao ser clicado demonstre a soma de
todos os salários exibidos na tabela.
Deverá ser criada uma segunda tela, de Parâmetros, onde o usuário irá escolher se o botão da
tela inicial exibirá a soma dos Salários Atuais ou dos Salários Anteriores quando clicado.

Recomendado:
- HTML, CSS, Javascript (+ jQuery ou Vue.js ou React)
- PHP
- MySQL
- Utilizar Bootstrap para complementar o visual
- Fazer uso de requisições Ajax para atualizar informações sem recarregar a página

Exemplo:
```js

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Consulta a cada 5 segundos (ajuste conforme necessário)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('URL_DA_API');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
```

# 3 - Teste de SQL

Escrever comando SQL para listar todos os funcionários “(A)tivos” da empresa “1” em ordem
alfabética. As informações a serem listadas são o nome do funcionário e seu respectivo cargo.

## Tabela Func
| Empresa | RE  | Nome            | Cargo | Status |
|---------|-----|-----------------|-------|--------|
| 1       | 1245| Maria da Silva  | 6     | A      |
| 1       | 584 | Benedito Costa  | 10    | A      |
| 2       | 847 | Joaquim Barbosa | 3     | A      |
| 1       | 54  | Antonio Pereira | 7     | D      |
| 1       | 84  | Joao Gomes      | 9     | A      |
| 2       | 658 | Luis Montanha   | 7     | A      |
| 1       | 841 | Isabel Silva    | 9     | D      |


## Tabela Cargo
| Código | Descrição            |
|--------|----------------------|
| 1      | Jardineiro           |
| 2      | Operador de Produção |
| 3      | Analista Fiscal      |
| 4      | Auxiliar de escritorio|
| 5      | Mecanico             |
| 6      | Analista de Sistemas |
| 7      | Gerente              |
| 8      | Diretor              |
| 9      | Porteiro             |
| 10     | Analista de RH       |
