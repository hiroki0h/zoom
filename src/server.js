import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug'); // 확장자 지정
app.set('views', __dirname + '/views'); // 폴더 경로 지정
app.use('/public', express.static(__dirname + '/public'));
console.log('hello');

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:4000`);
// app.listen(4000, handleListen);
const server = http.createServer(app); // http server 만들기
const wss = new WebSocket.Server({ server }); // WebSocket server
// http server & webSocket server 둘 다 작동 (webSocket만 돌리고 싶을땐 server 필수 아님)
// http 위에 ws 입힘
const sockets = [];
wss.on('connection', (socket) => {
    sockets.push(socket);
    console.log('connected to browser');
    socket.on('close', () => console.log('disconnected from browser'));
    socket.on('message', (message) => {
        const messageString = message.toString('utf8'); 
        
        // or npm install ws@7.5.3 --save
        sockets.forEach((aSocket) => aSocket.send(messageString));
    });
});
server.listen(4000, handleListen);
