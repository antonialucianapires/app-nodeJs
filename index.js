const express = require('express');
const prom = require('prom-client');
const register = prom.register;
const app = express();

//contador
const counter = new prom.Counter({
  name: 'app_request_total',
  help: 'contador de request',
  labelNames:['statusCode']
});

//gauge
const gauge = new prom.Gauge({
    name: 'app_free_bytes',
    help: 'contador de request',
    labelNames:['statusCode']
})

app.get('/', (req, res) => {

    //contador
    counter.labels('200').inc();

    //gauge
    gauge.set(100 * Math.random());
    
    return res.send('Hello, JS!')
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(register.metrics());
})

app.listen(3001);