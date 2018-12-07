const express = require('express');
const app = express();

const logMiddleware = (req, res, next) => {
    console.log(`HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`);

    req.AppName = 'GoNode';

    return next();
};

app.use(logMiddleware);

app.get('/', (req, res) => res.send(`Bem-vinde ao ${req.AppName}, ${req.query.name}`));

app.get('/login/:name', (req, res)=> res.json({ message: `Bem vinde, ${req.params.name}` }));

app.listen(3000);

