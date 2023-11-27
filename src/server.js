import express from 'express';

const app = express();

app.set('view engine', 'pug'); // 확장자 지정
app.set('views', __dirname + '/views'); // 폴더 경로 지정
app.use('/public', express.static(__dirname + '/public'));
console.log('hello');

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));
const handleListen = () => console.log(`Listening on http://localhost:4000`);
app.listen(4000, handleListen);
