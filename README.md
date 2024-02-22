api-worst-movie
===

## Melhorias

- Existem alguns pontos que podem ser refatorados para uma melhor leitura do código.
- TODO: trazer a listagem de intervalos caso haja mais de um, hoje traz apenas um de cada.

## Banco de dados
 - Optei por usar o sqlite3

## Clonar projeto

```|
$ git clone https://github.com/jpontesmartins/api-worst-movie
```


## Instalar 

```
$ npm install
```

## Rodar em modo de desenvolvimento
```
$ npm run start:dev
```

## Chamada ao GET /movies
```
curl --location 'http://localhost:3000/movies'
```

## Adicionar outro CSV de listagem de filmes POST /asset/upload
```
curl --location 'http://localhost:3000/asset/upload' \
--form 'file=@"/C:/Users/joao/downloads/arquivo_de_filmes.csv"'

```





