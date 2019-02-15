const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('./routes/projectRoute');
const actionRouter = require('./routes/actionRoute');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n')
});

module.exports = server;