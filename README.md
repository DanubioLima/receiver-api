# Transfeera API

API REST simples com um CRUD onde é possível criar, listar, deletar e atualizar recebedores (`receivers`)

## Rodar o projeto

Certifique-se que você tenha o Nodejs instalado, de preferência na versão `20.13.1` que foi a utilizada para criar o projeto. O Docker também é necessário para subir o Postgres localmente. 
Se você usa [asdf](https://asdf-vm.com/) o arquivo `.tool-versions` na raíz do projeto já tem a versão correta a ser instalada.

Depois de clonar esse repo para sua máquina, siga esses passos:

1. Instale as dependências:

```sh
npm ci
```

2. Suba os containers necessários para executar o app:

```sh
docker compose up -d
```

Esse comando sobe uma instância local do Postgres junto com uma UI chamada `adminer` que fica disponível em `localhost:8080` para visualizar as tabelas do banco de forma mais agradável.

3. Para verificar que está tudo correto, execute a pilha de testes:

```sh
npm run test
```

## Tech Stack 🖥️:

<img width="20" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/> Nodejs <br>
<img width="20" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/> PostgreSQL <br>
<img width="20" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/> TypeScript <br>
<img width="20" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/> Express <br>

## Outras libs usadas

- [Drizzle ORM](https://orm.drizzle.team/)
- [Japa Runner](https://japa.dev/docs/introduction)
- [Zod](https://zod.dev/)
