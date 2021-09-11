const client = require('prom-client');

const metrics = app => {

    const register = new client.Registry();

    client.collectDefaultMetrics({
        app: 'node-web-app-monitor',
        prefix: 'node_',
        timeout: 10000,
        gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
        register
    });

    const httpRequestCounter = new client.Counter({
        name: 'http_request_counter',
        help: 'Total HTTP requests',
        labelNames: ['path', 'code', 'method']
    });
      
    register.registerMetric(httpRequestCounter);

    app.use((req, res, next) => {
        httpRequestCounter.inc();
        next();
    });

    app.get('/metrics', async (req, res) => {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    });

};

module.exports = metrics;