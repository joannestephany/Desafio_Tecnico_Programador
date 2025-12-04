# Desafio Técnico - Sistema de Gerenciamento de Veículos

Este projeto é uma API REST para gerenciamento de veículos (carros e motos), desenvolvida em Java utilizando o framework Javalin.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

*   **Java JDK 18** ou superior
*   **Maven** (para gerenciamento de dependências e build)
*   **MySQL** (Banco de dados)
*   **Git** (opcional, para clonar o repositório)

## Configuração do Banco de Dados

1.  Crie um banco de dados MySQL chamado `bancodesafio`.
2.  Execute o seguinte script SQL para criar as tabelas necessárias:

```sql
CREATE DATABASE IF NOT EXISTS bancodesafio;
USE bancodesafio;

CREATE TABLE IF NOT EXISTS veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    fabricante VARCHAR(255) NOT NULL,
    ano_fab INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'CARRO' ou 'MOTO'
    cor VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS carros (
    id INT PRIMARY KEY,
    quantidade_portas INT NOT NULL,
    tipo_combustivel VARCHAR(50),
    FOREIGN KEY (id) REFERENCES veiculos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS motos (
    id INT PRIMARY KEY,
    cilindrada INT NOT NULL,
    FOREIGN KEY (id) REFERENCES veiculos(id) ON DELETE CASCADE
);
```

### Configuração de Conexão

Por padrão, a aplicação tenta conectar com as seguintes credenciais:
*   **URL**: `jdbc:mysql://localhost:3306/bancodesafio`
*   **Usuário**: `root`  
*   **Senha**: `admin` 

Se o seu banco de dados estiver configurado diferente, você pode definir as seguintes variáveis de ambiente antes de rodar a aplicação:

*   `DB_URL`: URL de conexão JDBC (ex: `jdbc:mysql://localhost:3306/meubanco`)
*   `DB_USER`: Usuário do banco
*   `DB_PASSWORD`: Senha do banco

## Instalação e Execução

1.  **Clone o repositório** (se ainda não tiver):
    ```bash
    git clone <url-do-repositorio>
    cd DesafioTecnicoSergipeTec
    ```

2.  **Instale as dependências e compile o projeto**:
    ```bash
    mvn clean install
    ```

3.  **Execute a aplicação**:
    Você pode rodar diretamente via Maven:
    ```bash
    mvn exec:java -Dexec.mainClass="com.desafio.Main"
    ```
    Ou rodar o arquivo `src/main/java/com/desafio/Main.java` através da sua IDE (IntelliJ, Eclipse, VS Code).

    A aplicação iniciará na porta **7001**.

## Testando a API

O projeto inclui um arquivo de coleção do Postman para facilitar os testes.

1.  Abra o Postman.
2.  Importe o arquivo `postman.json` localizado na raiz do projeto.
3.  Utilize as requisições importadas para testar os endpoints de criação, listagem, atualização e remoção de veículos.

### Endpoints Principais

*   `GET /veiculos`: Lista todos os veículos (suporta filtros por tipo, modelo, cor, ano).
*   `GET /veiculos/{id}`: Busca um veículo pelo ID.
*   `POST /veiculos`: Cria um novo veículo.
*   `PUT /veiculos/{id}`: Atualiza um veículo existente.
*   `DELETE /veiculos/{id}`: Remove um veículo.