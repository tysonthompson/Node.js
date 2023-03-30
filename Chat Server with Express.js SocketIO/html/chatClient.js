//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page
let username = '';

socket.on('serverSays', function(message) {
  let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  msgDiv.textContent = message
  if(username !== ''){
    document.getElementById('messages').appendChild(msgDiv)
  }
  
})

socket.on('serverSaysPriv', function(message) {
  let msgDiv = document.createElement('div')
  let messageData = message.split(" ")
  const separatorIndex = message.indexOf(':');
  msgDiv.textContent = messageData[0] + ": " + message.substring(separatorIndex + 1).trim()
  msgDiv.style.backgroundColor = '#ff0000';
  
  if(message.includes(username)){
    document.getElementById('messages').appendChild(msgDiv)
  }
  
})

function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  let username = document.getElementById('connectBox').value.trim()
  if(message === '') return //do nothing
  
  if(message.includes(":")){
    socket.emit('clientSaysPriv', username + " " + message)
  }
  else{
    let msgDiv = document.createElement('div')
    msgDiv.style.backgroundColor = '#558bff'
    msgDiv.textContent = username + ": " + message
    document.getElementById('messages').appendChild(msgDiv)
    socket.emit('clientSays',username + ": " + message)
  }
  document.getElementById('msgBox').value = ''
}

function connectUser() {
  const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;

  username = document.getElementById('connectBox').value.trim()
  if(username === '') return //do nothing
  if(regex.test(username)){
    socket.emit('clientSaysSelf', (username + " has connected to the server."))
    document.getElementById('msgBox').disabled = false;
    document.getElementById('send_button').disabled = false;
  }
  else{
    document.getElementById('connectBox').value = ''
    alert("invalid username.")
  }
  document.getElementById('connectBox').disabled = true;
  document.getElementById('connect_button').disabled = true;
}

function clearChat() {
  document.getElementById('messages').innerHTML=''
}


function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}



//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('connect_button').addEventListener('click', connectUser) 
  document.getElementById('clear_button').addEventListener('click', clearChat) 

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
