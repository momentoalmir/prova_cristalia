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

```sql


CREATE TABLE Empresa (
    codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE Cargo (
    codigo INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE Func (
    empresa INT NOT NULL,
    RE INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cargo INT NOT NULL,
    disponibilidade ENUM('A', 'D') NOT NULL,
    PRIMARY KEY (RE),
    Foreign Key (empresa) references Empresa(codigo),
    Foreign Key (cargo) references Cargo(codigo)
);

-- Inserir dados

INSERT INTO Empresa (codigo, nome)
VALUES
	(1, 'Cristalia'),
  (2, 'Outra Empresa'),
  (3, '1');

INSERT INTO Cargo (codigo, descricao)
VALUES
    (1, 'Jardineiro'),
    (2, 'Operador de Produção'),
    (3, 'Analista Fiscal'),
    (4, 'Auxiliar de escritorio'),
    (5, 'Mecanico'),
    (6, 'Analista de Sistemas'),
    (7, 'Gerente'),
    (8, 'Diretor'),
    (9, 'Porteiro'),
    (10, 'Analista de RH');

INSERT INTO Func (empresa, RE, nome, cargo, disponibilidade)
VALUES
    (1, 1245, 'Maria da Silva', 6, 'A'),
    (1, 584, 'Benedito Costa', 10, 'A'),
    (2, 847, 'Joaquim Barbosa', 3, 'A'),
    (1, 54, 'Antonio Pereira', 7, 'D'),
    (1, 84, 'Joao Gomes', 9, 'A'),
    (2, 658, 'Luis Montanha', 7, 'A'),
    (1, 841, 'Isabel Silva', 9, 'D');



-- Escrever comando SQL para listar todos os funcionários “(A)tivos” da empresa “1” em ordem
-- alfabética. As informações a serem listadas são o nome do funcionário e seu respectivo cargo.

SELECT f.nome, c.descricao
FROM Func f
INNER JOIN Cargo c ON f.cargo = c.codigo
WHERE f.empresa = 1 AND f.disponibilidade = 'A'
ORDER BY f.nome;

-- Se a intenção do exercício for filtrar pelo nome da empresa, então a consulta ficaria assim:

SELECT f.nome, c.descricao
FROM Func f
INNER JOIN Cargo c ON f.cargo = c.codigo
INNER JOIN Empresa e ON f.empresa = e.codigo
WHERE e.nome = '1' AND f.disponibilidade = 'A'
```
