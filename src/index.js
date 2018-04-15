const app = require('./config/app');

const server = app.listen(3000);

server.on('listening', () =>
    console.log('Express application started 3000')
);
