# SteamTrack

## Identificação/Autor

**Adnir Andrade**

---

## Descrição do Projeto

SteamBacklogTracker is an application designed to help users manage their Steam game collection efficiently. It allows users to mark which games they have played, track achievement progress, and view estimated completion times based on _How Long to Beat_. The goal is to provide a structured way to organize and complete Steam games, so you can know which game to play next, or what do you still have to complete 100%.

---

## Link para a API em Produção

_To be added_

---

## Instruções de Execução

_To be added_

### Instalação

_To be added_

### Pré-requisitos:

_To be added_

### Execução:

_To be added_

### Configuração do Banco de Dados:

_To be added_

**Variáveis de Ambiente:**
_To be added_

---

## Diagrama de Entidade-Relacionamento (ERD):

_To be added_

---

## Documentação Swagger:

_To be added_

---

## Requisitos Avaliativos (RA) e Itens de Desempenho (ID)

#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.

- [ ] **ID1:** Configurou corretamente o ambiente de desenvolvimento e criou a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
- [ ] **ID2:** Aplicou boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores.
- [ ] **ID3:** Utilizou providers e configurou adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
- [ ] **ID4:** Criou e manipulou rotas HTTP, manipulando parâmetros de rota, query e body corretamente.
- [ ] **ID5:** Aplicou boas práticas de tratamento de erros, utilizando filtros globais e personalizando mensagens de erro.
- [ ] **ID6:** Criou classes DTO para garantir validação e consistência dos dados, utilizando pipes.
- [ ] **ID7:** Aplicou corretamente pipes de validação para assegurar integridade dos dados.

#### RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.

- [ ] **ID8:** Modelou corretamente os dados, definindo entidades, relações e campos refletidos em um ERD.
- [ ] **ID9:** Configurou e conectou a API a um banco de dados relacional usando Prisma ou TypeORM.
- [ ] **ID10:** Criou e aplicou migrações de banco para garantir consistência entre ambientes.
- [ ] **ID11:** Implementou operações CRUD para pelo menos uma entidade utilizando NestJS.

#### RA3 - Realizar testes automatizados para garantir a qualidade da API.

- [ ] **ID12:** Implementou testes automatizados com Jest, validando funcionalidades críticas da API.
- [ ] **ID13:** Garantiu cobertura de testes para rotas e serviços principais, incluindo operações CRUD.

#### RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.

- [ ] **ID14:** Integrou Swagger à API, gerando documentação interativa com exemplos.
- [ ] **ID15:** Realizou o deploy da API em uma plataforma de nuvem (Render, Heroku, Vercel, etc.).
- [ ] **ID16:** Garantiu o funcionamento da API em produção, incluindo documentação e banco de dados.
- [ ] **ID17:** Configurou variáveis de ambiente com ConfigModule do NestJS.
- [ ] **ID18:** Implementou versionamento de APIs REST no NestJS.

#### RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.

- [ ] **ID19:** Configurou autenticação na API utilizando JWT.
- [ ] **ID20:** Implementou controle de acesso baseado em roles e níveis de permissão usando Guards.
- [ ] **ID21:** Utilizou middleware para tarefas como autenticação, logging ou CORS.
- [ ] **ID22:** Implementou interceptadores para logging ou modificação de respostas.