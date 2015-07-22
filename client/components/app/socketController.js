// socketController.js

var user = {id: 0, display_name: 'Anonymous' + Math.floor(Math.random() * 1000)},
    room = 'root',
    server_uri = 'http://' + document.domain + ':3000',
    socket = io(server_uri);