const messageUl = document.querySelector('ul');
const messageForm = document.querySelector('form');
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
const handleSubmit = (e) => {
    e.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    input.value = '';
};
messageForm.addEventListener('submit', handleSubmit);
