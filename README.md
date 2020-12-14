<img alt="logo-ita" title="#CES 27 EXAME" src="https://logodownload.org/wp-content/uploads/2018/01/ita-logo.png" width="400px" />

## [Back-end] CES-27 Exame
Projeto do Back-end criado para a aplicação feita no exame de CES-27 pelos alunos: Luís Eduardo Martins Lauro e Ítalo Rennan Lima Silva

### Tecnologias
API desenvolvida em [Node](https://nodejs.org/en/), utilizando o [express](https://expressjs.com/) como framework web. <br/>
DB criado utilizando [MongoDB](https://www.mongodb.com/). <br/> 
Outras dependências utilizadas: 
 - [body-parser](https://www.npmjs.com/package/body-parser) - adiciona um middleware de parse para formatar o body de requests.
 - [cors](https://www.npmjs.com/package/cors) - configura a cors da API, permitindo rodar front e back-end localmente simultaneamente.
 - [mongoose](https://mongoosejs.com/) - modelagem do banco de dados utilizando MongoDB.
 - [mongoose-patch-update](https://www.npmjs.com/package/mongoose-patch-update) - facilitar atualização de dados no DB.
 - [nodemon](https://www.npmjs.com/package/nodemon) - atualização automática de mudanças feitas no js enquanto o servidor estiver rodando.

### Estrutura de pastas
 ```js
 - config
 - controllers
 - middleware
 - models
 - services
 ```

### Deploy da API
O deploy da API foi feito utilizando o [heroku](https://dashboard.heroku.com/) <br/>
O deploy do banco de dados foi feito utilizando o [Mongo Atlas](https://www.mongodb.com/cloud/atlas), plataforma construída em conjunto entre a Mongo e a AWS. <br/>
A API está disponível no link: https://tranquil-gorge-34252.herokuapp.com/ <br/>
A princípio, para facilitar o acesso e teste da API, não estamos fazendo nenhuma restrição nos resquest. Em uma versão final deveríamos restringir o acess às rotas apenas à aplicação front-end da aplicação.

### Rotas implementadas
É importante comentar que, em uma implementação final, essas rotas não estariam disponíveis ao usuário. Apenas o servidor do heroku poderia acessá-las.
```
- "/" - Rota de ping, para certificar que a API está rodando
- "/wallet/createWallet" - Rota utilizada para criar uma carteira, recebe como parâmetros do body: walletAddr, contractAddr, name, age, height, weight.
- "/wallet/getWallet" - Rota utilizada para obter uma carteira. Recebe como parâmetros o endereço da carteira que deve ser obtida. 
                        Antes de chamar a rota, é feita uma validação no front se o usuário pode ter acesso àquela carteira.
- "/wallet/updateWallet" - Rota utilizada para atualizar a carteira. Rota recebe como parâmetro o walletAddr (usado para fazer query) e os novos dados do registro.
- "/wallet/deleteWallet" - Rota utilizada para deletar uma carteira. Recebe como paramêtro o walletAddr.
```

### Iniciando a API localmente
Verificar se existe [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [mongoDB](https://www.mongodb.com/) e [docker](https://www.docker.com/) instalados na sua máquina antes de iniciar com o projeto. 

```bash
# Primeira utilização
# Clone o repositório front-end
$ git clone https://github.com/lulis123/back-vestibulinho-casd

# Primeira utilização
# Entre no repositório
$ cd front-vestibulinho-casd

# Primeira utilização
# Instale as dependências que estão presentes no arquivo 'package.json'
$ npm install

# Primeira utilização
# Instalar Docker e mongo, caso não os tenha instalado.
$ chmod +x installDockerMongo.sh
$ ./installDockerMongo.sh

# Sempre
# Subir o DB
$ ./runMongoDB.sh

#Sempre
# Rodar a API
$ npm start
```
