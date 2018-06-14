var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const maxHistoryLength = 10000;

let historyCollection = {
    collection: [],
    push: function(msg) {
        if(this.collection.length > maxHistoryLength) {
            this.collection.shift();
        }
        this.collection.push(msg);
    }
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/historyCollection', function (req, res) {
    res.json(historyCollection.collection);
});

http.listen(80, function () {
    console.log('listen *:80');
});

io.set('transports', ['websocket']);

io.on('connection', function (socket) {
    socket.on('setData', function (msg) {
        historyCollection.push(msg);
        io.emit('getData', msg);
    });
});