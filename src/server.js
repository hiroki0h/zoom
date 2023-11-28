import http from 'http';
import SocketIO from "socket.io";
import express from 'express';

const app = express();

app.set('view engine', 'pug'); // 확장자 지정
app.set('views', __dirname + '/views'); // 폴더 경로 지정
app.use('/public', express.static(__dirname + '/public'));
console.log('hello');

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:4000`);
const server = http.createServer(app); // http server 만들기
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log(socket)
})
server.listen(4000, handleListen);
