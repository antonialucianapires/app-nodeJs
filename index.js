const express = require('express');
const promClient = require('prom-client');
const register = promClient.register;
const app = express();

//contador
const counter = new promClient.Counter({
  name: 'app_request_total',
  help: 'contador de request',
  labelNames:['statusCode']
});

//gauge
const gauge = new promClient.Gauge({
    name: 'app_free_bytes',
    help: 'contador de request',
    labelNames:['statusCode']
});

//histogram
const histogram = new promClient.Histogram({
    name: 'app_request_time_seconds',
    help: 'tempo de resposta da api',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
  });

//summary
const summary = new promClient.Summary({
    name: 'app_summary_request_time_seconds',
    help: 'tempo de resposta da api',
    percentiles: [0.5, 0.9, 0.99],
  });

app.get('/', (req, res) => {

    const tempo =Math.random();

    //contador
    counter.labels('200').inc();

    //gauge
    gauge.set(100 * Math.random());

    //histogram
    histogram.observe(tempo);

    //summary
    summary.observe(tempo);
    
    return res.send('Hello, JS!')
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(register.metrics());
})

app.listen(3001);