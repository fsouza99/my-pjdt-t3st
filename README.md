## Arquitetura

- Uma **API REST** é implementada com o framework **ASP.NET Core**, linguagem C#.
	- Execute o programa com a opção ```--swagger``` para testar a API pelo navegador utilizando o **Swagger** no endereço ```localhost:5176/swagger```.
- Ela dá acesso a um banco de dados, que pode ser **MySQL** ou **SQLite**.
	- Execute o programa com a opção ```--sqlite``` para utilizar o SQLite.
	- O acesso ao banco de dados é feito por intermédio do **EF Core**.
	- O MySQL é utilizado por padrão. Uma variável de ambiente ```MATERIAL_MGM_DB_CONN``` precisa estar definida com uma string de conexão ao banco de dados. O EF Core tratará de criar o esquema.
- A interface é um módulo front-end criado com o framework **Next.js**, baseado em React.
	- As páginas possuem responsividade implementada com o **Bootstrap**.

## Requisitos

Todos os requisitos foram cumpridos.

## Execução

### API

Execute a API na pasta associada com:

```bash
dotnet run
```

Você pode utilizar as opções de execução para SQLite e Swagger:

```bash
dotnet run --sqlite --swagger
```

Pode ser preciso instalar as dependências primeiro:

```bash
dotnet restore
```

**Requer .NET 9**.

### APP

Execute o aplicativo do website na pasta associada com:

```bash
pnpm run dev
```

Pode ser preciso instalar as dependências primeiro:

```bash
pnpm install
```

**Requer Node.js**.