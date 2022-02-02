const http = require('http');
const app = require('./app');

const port = process.env.port || process.env.SERVER_PORT;

const server = http.createServer(app);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error
    }
};

server.on('error', errorHandler);
server.on('listening', () => {
    console.log('Listening on port = '+ port);
});

server.listen(port);