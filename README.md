# SteamTrack

## Identificação/Autor

**Adnir Andrade**

---

## Descrição do Projeto

SteamBacklogTracker is an application designed to help users manage their Steam game collection efficiently. It allows users to mark which games they have played, track achievement progress, and view estimated completion times based on _How Long to Beat_. The goal is to provide a structured way to organize and complete Steam games, so you can know which game to play next, or what do you still have to complete 100%.

---

## Link para a API em Produção

```
To be added
```

> **Nota:** A API estará disponível em ambiente de produção até o dia **20/07/2025**. Após essa data, o serviço será desativado, pois trata-se de um projeto acadêmico e não há previsão de manutenção contínua no momento.

---

### Pré-requisitos:

	•	Docker
	•	Docker Compose
	•	Node.js (LTS)
	•	yarn
___

### Instalação (Getting Started)

#### 1. Clone o repositório
```bash
git@github.com:adnir-andrade/steam-track.git
```

#### 2. Suba o banco de dados com Docker Compose
```bash
docker-compose up -d
```

#### 3. Instale as dependências
```bash
yarn install
```

#### 4.	Configure o ambiente
Crie um arquivo .env na raiz e adicione:
```
DATABASE_URL="mysql://root:root@localhost:3306/steam-backlog-db"
JWT_SECRET=some-secret-here
```

#### 5.	Execute a migration do Prisma
```
npx prisma migrate dev --name init
```

#### 6.	Rode o seed com os dados iniciais
```
yarn seed
```

#### 7. Inicie servidor NestJS
```
yarn start
# ou, para ambiente de desenvolvimento:
yarn start:dev
```

___

### Prisma Studio

O **Prisma Studio** é uma interface gráfica intuitiva para visualizar e gerenciar os dados do banco de dados utilizado no projeto.

#### Acessar com Yarn

```bash
yarn studio
# Ou
npx prisma studio
```

Após rodar o comando, acesse http://localhost:5555 no navegador para abrir o Studio.
___

**Variáveis de Ambiente:**

| Nome da Variável | Descrição | Exemplo |
|------------------|-----------|---------|
| `DATABASE_URL`   | URL de conexão com o banco de dados MySQL | `mysql://root:root@localhost:3306/steam-backlog-db` |
| `JWT_SECRET`     | Segredo usado para assinatura dos tokens JWT | `some-secret-here` |

---

## Diagrama de Entidade-Relacionamento (ERD):

![dbDiagram.png](./docs/assets/dbDiagram.png)

---

## Documentação Swagger:

A documentação interativa da API está disponível em:

```
http://localhost:3000/api
```

Essa interface permite testar os endpoints da API diretamente pelo navegador, visualizar os parâmetros esperados, os retornos possíveis, além de simular autenticação com JWT usando o botão “Authorize”.

---

## Requisitos Avaliativos (RA) e Itens de Desempenho (ID)

#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.

- [x] **ID1:** Configurou corretamente o ambiente de desenvolvimento e criou a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
- [x] **ID2:** Aplicou boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores.
- [x] **ID3:** Utilizou providers e configurou adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
- [x] **ID4:** Criou e manipulou rotas HTTP, manipulando parâmetros de rota, query e body corretamente.
- [x] **ID5:** Aplicou boas práticas de tratamento de erros, utilizando filtros globais e personalizando mensagens de erro.
- [x] **ID6:** Criou classes DTO para garantir validação e consistência dos dados, utilizando pipes.
- [x] **ID7:** Aplicou corretamente pipes de validação para assegurar integridade dos dados.

#### RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.

- [x] **ID8:** Modelou corretamente os dados, definindo entidades, relações e campos refletidos em um ERD.
- [x] **ID9:** Configurou e conectou a API a um banco de dados relacional usando Prisma ou TypeORM.
- [x] **ID10:** Criou e aplicou migrações de banco para garantir consistência entre ambientes.
- [x] **ID11:** Implementou operações CRUD para pelo menos uma entidade utilizando NestJS.

#### RA3 - Realizar testes automatizados para garantir a qualidade da API.

<!--
As observações abaixo explicam por que os itens ID12 e ID13 não foram implementados, conforme orientação do professor. Portanto, não serão marcadas como concluídos, mas sim mostrados como excluídos conscientemente do escopo.
-->

- [ ] ~~**ID12:** Implementou testes automatizados com Jest, validando funcionalidades críticas da API.~~

- [ ] ~~**ID13:** Garantiu cobertura de testes para rotas e serviços principais, incluindo operações CRUD.~~

  > **Observação:** Conforme alinhado com a orientação do professor, a cobertura de testes automatizados não foi incluída nesta entrega.

#### RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.

- [x] **ID14:** Integrou Swagger à API, gerando documentação interativa com exemplos.
- [ ] **ID15:** Realizou o deploy da API em uma plataforma de nuvem (Render, Heroku, Vercel, etc.).
- [ ] **ID16:** Garantiu o funcionamento da API em produção, incluindo documentação e banco de dados.
- [x] **ID17:** Configurou variáveis de ambiente com ConfigModule do NestJS.
- [x] **ID18:** Implementou versionamento de APIs REST no NestJS.

#### RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.

- [x] **ID19:** Configurou autenticação na API utilizando JWT.
- [x] **ID20:** Implementou controle de acesso baseado em roles e níveis de permissão usando Guards.
- [x] **ID21:** Utilizou middleware para tarefas como autenticação, logging ou CORS.
> **Observação:** Durante a implementação da feature de autenticação com JWT (branch `feature/jwt-token`), foi utilizado um middleware personalizado para autenticação. No entanto, optou-se por removê-lo no commit `b660c28769819574d6ba07d019a9acfe9acf0c89` (06/08/2025), pois sua funcionalidade se tornava redundante diante do uso do `JwtAuthGuard`, que oferece uma solução mais adequada e alinhada às boas práticas do NestJS.
- [x] **ID22:** Implementou interceptadores para logging ou modificação de respostas.