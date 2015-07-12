$(document).ready(function () {
    setupWebsocket();
});

function setupWebsocket() {
    var websocket;
    var wsUri = "ws://localhost:8084/Websocket01/graficos";

    try {
        websocket = new WebSocket(wsUri);
    } catch (err) {
        console.log("WEBSOCKET: error on constructor", err);
        return;
    }

    // websocket.binaryType = "arraybuffer";

    websocket.onopen = function (evt) {
        console.log("WEBSOCKET: connected");
    };

    websocket.onmessage = function (evt) {
        console.log("WEBSOCKET: message");

        // var json = JSON.parse(evt.data);
        // if (typeof evt.data === "string") {
        //     desenhar(json);
        //     $('#idSpan').html(json.teta);
        // } else {
        //     console.log('Recebeu dados binários! E agora?');
        // }
    };

    websocket.onerror = function (evt) {
        console.log("WEBSOCKET: error");
    };
}

function editorChanged(e) {
    console.log('DEBUG: editorChanged');

    var editorHTML = tinyMCE.get('editor').getContent();
    // TODO: send this to websocket
}
