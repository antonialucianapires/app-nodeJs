const express = require('express');
const prom = require('prom-client');
const register = prom.register;
const app = express();

//contador
const client = require('prom-client');
const { response } = require('express');
const counter = new client.Counter({
  name: 'app_request_total',
  help: 'contador de request',
  labelNames:['statusCode']
});


app.get('/', (req, res) => {

    //incrementa contador
    counter.labels('200').inc();
    
    return res.send('Hello, JS!')
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(register.metrics());
})

app.listen(3001);