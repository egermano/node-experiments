var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs'),
    mysql = require('mysql');

app.listen(8080);

var client = mysql.createClient({
    user: 'root',
    password: 'root'
});

client.useDatabase('unipac_2021');

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var users;

client.query('SELECT * FROM users', function(err, results, fields){
    if (err) throw err;
    users = {'fields': fields, 'results': results};
});

io.sockets.on('connection', function (socket) {
    
    var interval = setInterval(function(){
        socket.emit('users', {'data': users})
    }, 500);


    socket.on('disconnect', function () {
        console.log('disconnect!');
        clearInterval(interval);
      });
});