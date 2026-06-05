# Projeto Frontend - Exercícios em Grupo 🚀

Este repositório contém uma aplicação desenvolvida em React para praticar o consumo de APIs mockadas, manipulação de estados (`useState`, `useEffect`), estilização com Bootstrap 5 e componentes dinâmicos de filtragem e busca.

O projeto foi desenvolvido como parte das atividades práticas do programa de residência/capacitação em software.

---

## 👥 Integrantes (Grupo 3)
* **Juliano**
* **Luiz Antônio**
* **Mariana**
* **Matheus**

---

## 🛠️ Tecnologias Utilizadas

* **React** (Vite / Create React App)
* **Bootstrap 5** (Sistema de Grid e Componentes de Formulário)
* **MockAPI.io** (Para simulação de API REST)
* **Axios** ou **Fetch API** (Para requisições HTTP)

---

## 📋 Funcionalidades Desenvolvidas

### 1. Cadastro de Pessoas & Listagem em Tempo Real
* Integração com uma API criada no [MockAPI](https://mockapi.io/) contendo os campos: `Nome`, `CPF` e `E-mail`.
* Formulário de inserção estruturado com o **Sistema de Grid do Bootstrap**.
* Atualização automática e reativa da lista de pessoas exibida na tela logo após o envio do formulário.

### 2. Busca de Pessoas por ID
* Componente dedicado para consulta individual.
* O usuário digita o ID correspondente e a aplicação busca os dados diretamente na API, exibindo o resultado formatado em tela.

### 3. Filtro Dinâmico de Carros (Select & Input)
* Renderização de uma lista de automóveis.
* Barra de busca acoplada a um seletor (Caixa de Seleção/Select) que filtra os veículos em tempo real de acordo com a marca selecionada ou o termo digitado.

### 4. Alternador de Cores com Hooks (`useState` & `useEffect`)
* Uma página/seção interativa que altera a cor do plano de fundo (background) a cada clique de botão.
* Limitação estrita de até **4 cores** pré-definidas.
* Exibição em tempo real do código hexadecimal (`HEX`) da cor que está ativa na tela, gerenciada via efeitos colaterais (`useEffect`).

