var socket = io();

const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left' || position == 'center')
    audio.play();
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
})

const nam = prompt("Please enter your name");
socket.emit("new-user-joined", nam);

socket.on('User-Joined', uname =>{
    append(`${uname} joined the chat`, 'center');
})
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'center');
})