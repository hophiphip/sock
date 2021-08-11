const defaultUrl = 'ws://localhost:8080/';

class WsListener {
    constructor(messageUpdater, url = defaultUrl) {
        this.handler = messageUpdater;
        this.url = url;
        this.ws = null
    }

    connect() {
        if (this.ws != null) {
            console.log('is pending');
        } else {
            this.ws = new WebSocket(this.url);
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onclose = this.onClose.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
        }
    } 

    onOpen(e) {
        console.log("connected");
    }

    onMessage(e) {
        this.handler(e.data);
    }

    onClose() {
        console.log("disconnected");
        this.ws = null;
    }
}

let addMessage = function(msg) {
    var newMessage = document.createElement("li");
    newMessage.appendChild(document.createTextNode(msg));
    document.getElementById('log-list').appendChild(newMessage);
}

var listener = new WsListener(addMessage);
listener.connect();

document.getElementById('upd').addEventListener('click', function (e) { listener.connect(); }, false);
