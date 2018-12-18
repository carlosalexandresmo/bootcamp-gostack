# GoNode - Modulo 2

### Configurando servidor

```javascript
const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.middlewares();
    this.views();
    this.roure();
  }

  middlewares() {
    this.express.use(express.urlenconded({ extended: false }));
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });

    this.express.set("view engine", "njk");
  }

  routes() {}

  module.exports = new App().express
}
```

O método constructor é o método construtor da classe. Ele é o método chamado quando a classe é intanciada em um objeto.

O `this.express` atribui o express a uma variavel express da própria classe. Esse método vai estar disponivel nos objetos derivados. Ele será tratado como a variavel `app` no módulo anterior. A partir do `this.express` que iremos configurar o Nunjucks, middlewares e outras coisas.

A varivel `this.isDev` vai indicar se estamos em ambiente de teste ou não. Isso é importante pois é comum dividirmos o desenvolvimento em diversas "áreas"como: desenvolvimento, produção, debug, testes, etc. O Node possui uma variavel de ambiente que informa em qual área estamos, ela se chama **process.env.NODE_ENV**

Os métodos `middlewares`, `views` e `routes` é para controlar cada um dos respectivos.

O `this.express.use(express.urlenconded({ extended: false }))` é utilizado para tratar formulários.

Para lidarmos com as views nos importamos o nunjucks e configuramos. Uma parte importante é importar a biblioteca `path`. Ela é lida com o caminho das views, pois por exemplo, o Windows utiliza a barra invertida na construção dos caminhos das views. Para definir o nunjucks como nossa engine usamos o comando `this.express.set('view engine', 'njk')`

Logo após criamos duas pastas: `app` e `views para seguir o modelo MVC.

Por fim exportamos a classe App instanciada, por isso usamos a palavra `new`. E como muitas vezes o mais desejado é o express, já exportamos o express na instância de App.

Em `index.js` nos importamos server.js e configuramos a sua porta. Nós utilizamos uma variável de ambiente para caso esteja configurada, ela ser usada, senão entrar como a porta 3000.

```javascript
const server = require("./server");

server.listen(process.env.PORT || 3000);
```

### Configurando arquivo de rotas

Nessa parte vamos configurar o arquivo de rotas. Criamos um arquivo `routes.js`. Nele importamos o express, criamos uma constante chamada routes e atribuimos o express. Configuramos uma rota de teste e exportamos o routes.

```javascript
const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Hello World :)");
});

module.exports = routes;
```

No arquivo index.js usamos a expressão abaixo para pesquisar as routas seguindo o arquivo routes

```javascript
routes () {
    this.express.use(require('./routes'))
  }
```

### Introduçao MVC
