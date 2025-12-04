# Frontend Desafio SergipeTec

Este é o frontend do projeto de gerenciamento de veículos para o desafio do SergipeTec. O projeto foi desenvolvido utilizando React, Vite e Tailwind CSS.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

*   **Node.js**: Versão 18 ou superior.
    *   [Download Node.js](https://nodejs.org/)
*   **npm** (geralmente vem com o Node.js) ou **yarn**.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Clonar ou Baixar o Projeto

Se você ainda não tem o projeto em sua máquina, clone o repositório ou extraia os arquivos na pasta desejada.

### 2. Instalar Dependências

Abra o terminal na pasta raiz do projeto (onde está o arquivo `package.json`) e execute o comando para instalar as bibliotecas necessárias:

```bash
npm install
# ou, se preferir usar yarn:
yarn
```

### 3. Configurar Variáveis de Ambiente (Opcional)

O projeto espera que o backend esteja rodando. Por padrão, ele pode estar configurado para acessar `http://localhost:8080` (ou a porta definida no seu backend). Verifique o arquivo de serviço (`src/services/api.js` ou similar) se precisar ajustar a URL base da API.

### 4. Rodar o Servidor de Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento, execute:

```bash
npm run dev
# ou
yarn dev
```

Após executar o comando, o terminal mostrará o link de acesso, geralmente:
`http://localhost:5173/`

Abra este link no seu navegador para ver a aplicação.

## 🛠️ Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts:

*   `npm run dev`: Inicia o servidor de desenvolvimento.
*   `npm run build`: Compila o projeto para produção (gera a pasta `dist`).
*   `npm run preview`: Visualiza a versão de produção localmente após o build.
*   `npm run lint`: Executa a verificação de código com ESLint.

## 📂 Estrutura do Projeto

*   `src/`: Código fonte da aplicação.
    *   `components/`: Componentes React reutilizáveis (ex: VehicleList, VehicleForm).
    *   `services/`: Configuração de chamadas à API (Axios).
    *   `App.jsx`: Componente principal e layout.
    *   `main.jsx`: Ponto de entrada da aplicação.

## 🎨 Tecnologias Utilizadas

*   [React](https://react.dev/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Axios](https://axios-http.com/)
*   [Lucide React](https://lucide.dev/) (Ícones)
