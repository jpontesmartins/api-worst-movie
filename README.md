api-worst-movie
===

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





