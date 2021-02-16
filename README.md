# NewsCards-backend

### Techs

- Node.js
- Express
- Knex.js
- MySQL

### Routes

`GET /newscards/:id` Lista os dados de um card específico <br><br>
`GET /newscards` Lista todos os cards <br><br>
`DELETE /newscards/:id` Deleta um card pelo id <br><br>
`POST /newscards` Adiciona um card <br><br>
![Insomnia Post Route Screenshot](./images/screenshot_post_insomnia.png)
`PUT /newscards/:id` Atualiza os dados de um card <br><br>

### Starting

- Clone o repositório

```
git clone https://github.com/Empix/newscards-backend.git
```

- Instale as dependências

```
yarn
```

- Configure o .env de acordo com o .env.example

- Rode as migrations

```
npx knex migrate:latest
```

- Inicie

```
yarn dev
```
