const messageList = document.querySelector('ul');
const nicknameForm = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
    console.log('connected to server');
});
socket.addEventListener('message', (message) => {
    console.log(message, 'from server');
    console.log(message.data);
});
socket.addEventListener('close', () => {
    console.log('disconnected from server');
});

// setTimeout(() => {
//     socket.send('hello from the browser~');
// }, 10000);
const makeMessage = (type, payload) => {
    const msg = {type, payload}
    return JSON.stringify(msg) // object => string 
    // backend언어가 javascript가 아닐 경우도 있으니 object로 보내지 말고 string으로 보낼 것
};
const handleSubmit = (e) => {
    e.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage('new_message',input.value));
    const li = document.createElement('li');
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = '';
};
const handleNicknameSubmit = (e) => {
    e.preventDefault();
    const input = nicknameForm.querySelector('input');
    socket.send(makeMessage('nickname',input.value));
};
messageForm.addEventListener('submit', handleSubmit);
nicknameForm.addEventListener('submit', handleNicknameSubmit);
