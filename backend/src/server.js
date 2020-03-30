const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://usuario:123@aircnc-3hgsk.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors()); // permite que qualquer pessoa possa acessar a api
// app.use(cors({ origin: 'http://localhost:3333' })); permite que apenas essa url acesse a api
app.use(express.json()); // irá trazer os retornos como JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333); // porta para rodar o servidor. Ex: http://localhost:3333/
