// socketController.js

var user = null, 
    room = 'root', 
    server_uri = 'http://' + document.domain + ':3000'; 
    socket = io(server_uri);