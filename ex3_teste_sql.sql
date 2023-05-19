CREATE DATABASE ex3_teste_sql;

USE ex3_teste_sql;

-- Criar tabelas

CREATE TABLE Func (
    empresa INT NOT NULL,
    RE INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cargo INT NOT NULL,
    disponibilidade ENUM('A', 'D') NOT NULL,
    PRIMARY KEY (empresa, RE)
);

CREATE TABLE Cargo (
    codigo INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo)
);

-- Inserir dados

INSERT INTO Func (empresa, RE, nome, cargo, disponibilidade)
VALUES
    (1, 1245, 'Maria da Silva', 6, 'A'),
    (1, 584, 'Benedito Costa', 10, 'A'),
    (2, 847, 'Joaquim Barbosa', 3, 'A'),
    (1, 54, 'Antonio Pereira', 7, 'D'),
    (1, 84, 'Joao Gomes', 9, 'A'),
    (2, 658, 'Luis Montanha', 7, 'A'),
    (1, 841, 'Isabel Silva', 9, 'D');

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

-- Escrever comando SQL para listar todos os funcionários “(A)tivos” da empresa “1” em ordem
-- alfabética. As informações a serem listadas são o nome do funcionário e seu respectivo cargo.

SELECT f.nome, c.descricao
FROM Func f
INNER JOIN Cargo c ON f.cargo = c.codigo
WHERE f.empresa = 1 AND f.disponibilidade = 'A'
ORDER BY f.nome;
