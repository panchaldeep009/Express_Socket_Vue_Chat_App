var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3300;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

let users = [];

io.attach(server);

io.on('connection', socket => {
    socket.on('register user', name => {
        if (!users.includes({ id: socket.id, name: name })) {
            users = [...users, { id: socket.id, name: name }];
        }
        io.emit('update users', users);
    });

    socket.on('send message', ({ from, to, message, time, status }) => {
        if (to == socket.id || from == socket.id || to == 'all') {
            io.emit('receive message', { from, to, message, time, status });
        }
    });

    socket.on('unregister user', () => {
        users = users.slice(0).filter(({ id }) => id !== socket.id);
        io.emit('update users', users);
    });

    socket.on('disconnect', () => {
        users = users.slice(0).filter(({ id }) => id !== socket.id);
        io.emit('update users', users);
    });
});
