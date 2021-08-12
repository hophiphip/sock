const defaultUrl = 'ws://localhost:8080/ws';

export class WsListener {
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
