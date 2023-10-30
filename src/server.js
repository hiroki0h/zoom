import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
console.log('hello');

const handleListen = () => console.log(`Listening on http://localhost:4000`);
app.listen(4000, handleListen);