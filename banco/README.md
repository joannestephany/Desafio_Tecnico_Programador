# Banco de Dados Desafio SergipeTec (MySQL)

Aqui os scripts SQL necessários para criar e popular o banco de dados utilizado no projeto Sistema de Gerenciamento de Veículos.

Aqui você encontrará:

bancodesafio.sql — Script de criação do banco e das tabelas \
seed.sql — Script opcional para popular o banco com dados iniciais


## 1. Pré-requisitos

Certifique-se de ter instalado:
```
MySQL 8.0+
```
Um cliente MySQL (WorkBench, DBeaver, TablePlus, CLI, etc.)

 ## 2. Criando o banco de dados

Para criar o banco e todas as tabelas necessárias, execute:

mysql -u root -p < bancodesafio.sql


Isso irá:

✔ Criar o banco \
✔ Criar as tabelas \
✔ Configurar relacionamentos \
✔ Preparar tudo para uso no backend \

## 3. (Opcional) Inserir dados iniciais

Caso deseje popular as tabelas com dados de teste:

mysql -u root -p < seed.sql

Isso irá inserir alguns veículos exemplo (carros e motos) para facilitar testes da aplicação.

---

Para conectar com o backend, mais informações no README.md da pasta backend.
