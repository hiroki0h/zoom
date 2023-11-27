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
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});
socket.addEventListener('close', () => {
    console.log('disconnected from server');
});

// setTimeout(() => {
//     socket.send('hello from the browser~');
// }, 10000);
const handleSubmit = (e) => {
    e.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    input.value = '';
};
const handleNicknameSubmit = (e) => {
    e.preventDefault();
    const input = nicknameForm.querySelector('input');
    socket.send(input.value);
    input.value = '';
};
messageForm.addEventListener('submit', handleSubmit);
nicknameForm.addEventListener('submit', handleNicknameSubmit);
