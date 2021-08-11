const defaultUrl = 'ws://localhost:8080/';

class WsListener {
    constructor(url = defaultUrl) {
        this.url = url;
        this.ws = null
    }

    connect() {
        if (this.ws != null) {
            console.log('is pending');
        } else {
            this.ws = new WebSocket(this.url);
            
            this.ws.onopen = function(e) {
                console.log("connected");
            }

            this.ws.onclose = this.onClose.bind(this);

            this.ws.onmessage = function(e) {
                WsListener.addMessage(e.data);
            }
        }
    } 

    onClose() {
        console.log("disconnected");
        this.ws = null;
    }

    static addMessage(msg) {
        var newMessage = document.createElement("li");
        newMessage.appendChild(document.createTextNode(msg));
        document.getElementById('log-list').appendChild(newMessage);
    }
}

var listener = new WsListener();
listener.connect();

document.getElementById('upd').addEventListener('click', function (e) { listener.connect(); }, false);
