const httpServer = require("http").createServer();
const users = {};

const io = require("socket.io")(httpServer, {
    cors: {
        // origin: "http://192.168.8.13:5500",
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    //When a new user connects to the socket
    console.log('New User');
    // socket.emit('chat-message', 'Hello World Message')

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-broadcast-message', { 'message': message, 'user': users[socket.id] })
    })

    socket.on('online-user', user => {
        users[socket.id] = user;
        socket.broadcast.emit('chat-user-connected', user)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('chat-user-disconnected', users[socket.id])
        delete users[socket.id];
    })

});

httpServer.listen(3000);