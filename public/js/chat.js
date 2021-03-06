const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');


const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('message',(message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate,{
    message : message.text,
    createdAt : moment(message.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend',html);
});

socket.on('locationMessage',(url) => {
  console.log(url);
  const html = Mustache.render(locationMessageTemplate,{
    url : url.text,
    createdAt : moment(url.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend',html);
});


$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled','disabled');

  const message = document.querySelector('input').value;

  socket.emit('sendMessage',message,() => {

    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    console.log('The message was delivered');
  });

});


$sendLocationButton.addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  $sendLocationButton.setAttribute('disabled','disabled');

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  socket.emit('sendLocation', {
    latitude : position.coords.latitude,
    longitude : position.coords.longitude
  },() => {
    $sendLocationButton.removeAttribute('disabled');
    console.log('Location Shared!');
  });
});

});
