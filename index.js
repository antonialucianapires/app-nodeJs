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
//histogram
const histogram = new prom.Histogram({
    name: 'app_request_time_seconds',
    help: 'tempo de resposta da api',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
  });

app.get('/', (req, res) => {

    //contador
    counter.labels('200').inc();

    //gauge
    gauge.set(100 * Math.random());

    //histogram
    histogram.observe(Math.random());
    
    return res.send('Hello, JS!')
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(register.metrics());
})

app.listen(3001);