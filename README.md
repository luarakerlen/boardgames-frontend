# Jogos de Tabuleiro

Este projeto foi desenvolvido como parte do Projeto MVP do curso de Pós-graduação em Engenharia de Software da PUC-Rio, na Sprint de Desenvolvimento Fullstack Básico e, posteriormente, foram adicionadas novas funcionalidades para a Sprint de Arquitetura de Software.

Este projeto é uma aplicação frontend que permite gerenciar uma coleção de jogos de tabuleiro. O usuário pode adicionar, visualizar, deletar e gerenciar a disponibilidade dos jogos, além de pedir ao programa para escolher um jogo aleatoriamente com base na quantidade de jogadores selecionada.

Esse é a parte do **frontend** do projeto. O **backend** utilizado nas chamadas deste projeto pode ser encontrado neste link: [boardgames-backend](https://github.com/luarakerlen/boardgames-backend).

---

## Índice
- [Funcionalidades](#funcionalidades)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura da Solução](#arquitetura-da-solução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Integração com API Externa](#integração-com-api-externa-inteligência-artificial)
- [Deploy](#deploy)
- [Observações](#observações)
- [Autora](#👩🏽‍💻-autora)

---

## Funcionalidades

- **Modal de Adicionar Jogo**:
  - Interface intuitiva para adicionar novos jogos.
  - Validação de campos obrigatórios.
- **Adicionar Jogos**: O usuário pode adicionar novos jogos informando:
  - Nome do jogo (obrigatório)
  - Número mínimo e máximo de jogadores (obrigatório)
  - Link da imagem do jogo (opcional)
  - Link para a página do jogo na Ludopédia (opcional)
- **Visualizar Jogos**: Os jogos adicionados são exibidos em listas separadas, com base na quantidade de jogadores selecionada e/ou nas preferências do usuário:
  - Jogos disponíveis
  - Jogos indisponíveis
- **Deletar jogos**: Permite remover jogos da lista.
- **Escolher Jogo Aleatório**: O programa escolhe aleatoriamente um jogo disponível com base na quantidade de jogadores selecionada e/ou nas preferências do usuário.
- **Gerenciar Disponibilidade**:
  - Marcar jogos como indisponíveis manualmente.
  - Retirar jogos da lista de indisponíveis.
- **Resetar Configurações**:
  - Desselecionar o número de jogadores.
  - Tornar todos os jogos disponíveis novamente.
- **Navegação**:
  - Botão para rolar a tela até os jogos indisponíveis.
  - Botão para rolar a tela de volta para o topo.
- **Interação com Ludopédia**:
  - No card do jogo escolhido aleatoriamente, o usuário pode passar o mouse e navegar para a página do jogo na Ludopédia.

### Funcionalidades adicionadas na Sprint de Arquitetura de Software

- **Editar jogos**: Permite atualizar informações de jogos existentes.
- **Sugestão com IA**: O usuário pode informar preferências (ex.: jogo estratégico, rápido, leve). O sistema solicita ao backend uma recomendação gerada por IA, que considera:
  - Lista de jogos cadastrados
  - Quantidade de jogadores
  - Preferências informadas

---

## Como Executar

Este projeto utiliza apenas **HTML**, **CSS** e **JavaScript**. Não é necessário instalar dependências ou configurar ambientes como Node.js.

1. Faça o download ou clone o repositório:
   ```bash
   git clone https://github.com/luarakerlen/boardgames-frontend.git
   ```

2. Abra o arquivo `index.html` no navegador.

---

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Execute como administrador o seguinte comando para construir a imagem Docker:

```bash
docker build -t boardgames-frontend .
```

Após construir a imagem, execute o container com o seguinte comando:

```bash
docker run -p 8080:80 boardgames-frontend
```

O frontend estará disponível em `http://localhost:8080`.

---

## Estrutura do Projeto

- **HTML**:
  - Estrutura principal da aplicação.
  - Modal para adicionar novos jogos.
- **CSS**:
  - Estilização responsiva e interativa.
  - Estilos para listas, cards, botões e modal.
- **JavaScript**:
  - Manipulação do DOM.
  - Gerenciamento de estados (jogos disponíveis/indisponíveis).
  - Comunicação com o backend para adicionar e deletar jogos.
  - Lógica para escolha aleatória de jogos.

---

## Arquitetura da Solução

Este projeto segue o Cenário 1.1 de Arquitetura, onde:

- O frontend se comunica com um backend próprio;

- O backend é responsável por:

  - Persistência dos dados em banco de dados

  - Comunicação com uma API externa de IA para geração de recomendações

### Diagrama da Arquitetura

> Cenário 1.1 – Frontend conectado ao backend, que por sua vez integra com uma API externa e um banco de dados.

Imagem do modelo arquitetural:

![Diagrama de Arquitetura – Cenário 1.1](./arquitetura-cenario-1-1.png)

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação.
- **CSS3**: Estilização e responsividade.
- **JavaScript**: Lógica e interatividade.
- **SweetAlert2**: Exibição de alertas personalizados.
- **Font Awesome**: Ícones para botões e interações.

---

## Integração com API Externa (Inteligência Artificial)

Este projeto utiliza uma **API externa de Inteligência Artificial** para fornecer sugestões de jogos de tabuleiro com base na quantidade de jogadores e nas preferências informadas pelo usuário.

A integração é realizada **indiretamente pelo backend**, mantendo o frontend desacoplado de serviços externos e concentrando as regras de negócio e segurança no servidor.

### API Externa Utilizada

- **Nome:** Google Gemini API
- **Fornecedor:** Google
- **Finalidade:** Geração de recomendações de jogos de tabuleiro por meio de modelos de linguagem.
- **Site oficial:** https://ai.google.dev/

### Licença de Uso

A Google Gemini API é disponibilizada sob os **termos de uso da Google**, com planos gratuitos e pagos, sujeitos a limites de requisição e políticas de uso definidas pelo fornecedor.

Termos de uso: https://ai.google.dev/terms

### Cadastro e Autenticação

Para utilizar a API é necessário:

1. Possuir uma conta Google.
2. Criar um projeto no Google AI Studio.
3. Gerar uma **API Key** para autenticação.
4. Armazenar a chave de forma segura no backend, utilizando variáveis de ambiente.

**Importante**: A chave da API **não é exposta no frontend** em nenhum momento.

### Rotas Utilizadas

A API do Gemini é acessada exclusivamente pelo backend, por meio da biblioteca oficial do Google, utilizando o método de geração de conteúdo:

- **Método:** `models.generate_content`
- **Modelo utilizado:** `gemini-2.5-flash`
- **Tipo de entrada:** Texto (prompt estruturado)
- **Tipo de saída:** Texto gerado com recomendação de jogo e explicação

O frontend consome apenas a rota interna do backend responsável pela recomendação:

- `POST /ai/recommendation`

Dessa forma, o frontend permanece desacoplado da API externa, comunicando-se apenas com a API principal do sistema.

---

## Deploy
A aplicação está disponível online no seguinte link:

🔗 [Boardgames Frontend - Deploy na Vercel](https://boardgames-frontend-three.vercel.app/)

---

## Observações

- O backend utilizado para as chamadas deste projeto pode ser encontrado no repositório: [boardgames-backend](https://github.com/luarakerlen/boardgames-backend).
- Certifique-se de que o backend esteja rodando localmente para que as funcionalidades de adicionar e deletar jogos funcionem corretamente.

---

## 👩🏽‍💻 Autora

<a href="https://www.linkedin.com/in/luarakerlen/" target="_blank">
 <img title="Luara Kerlen" style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/26902816?v=4" width="100px;" alt="Foto da Luara"/>
 </a>

Feito com ❤️ por <a href="https://www.linkedin.com/in/luarakerlen/" target="_blank"><b>Luara Kerlen</b></a> <a href="https://www.linkedin.com/in/luarakerlen/" title="Luara Kerlen"></a>
<br>Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Luara%20Kerlen-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/luarakerlen/)](https://www.linkedin.com/in/luarakerlen/)
[![Gmail Badge](https://img.shields.io/badge/-luarakerlen12@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:luarakerlen12@gmail.com)](mailto:luarakerlen12@gmail.com)
[![Instagram Badge](https://img.shields.io/badge/Luara%20Kerlen-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/luarakerlen)
