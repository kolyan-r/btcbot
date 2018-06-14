console.log('Bot connected');

let bot_socket = io('http://localhost:3000', {
    "transports" : ["websocket"]
});

socket.removeListener('realtime');

socket.on('realtime', function (msg) {
    if (!msg || msg.s == null) {
        return;
    }
    bot_socket.emit('setData', msg);
});