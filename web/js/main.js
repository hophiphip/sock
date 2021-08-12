import { WsListener } from './ws_listener.js'

let addMessage = function(msg) {
    var newMessage = document.createElement("li");
    newMessage.appendChild(document.createTextNode(msg));
    document.getElementById('log-list').appendChild(newMessage);
}

var listener = new WsListener(addMessage);
listener.connect();

document.getElementById('upd').addEventListener(
    'click', 
    function (e) { 
        listener.connect(); 
    }, 
    false
);
