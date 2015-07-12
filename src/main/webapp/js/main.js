$(document).ready(function () {
    setupWebsocket();
});

var websocket;

function setupWebsocket() {
    var wsUri = "ws://" + document.location.host + document.location.pathname + "endpoint";
    websocket = new WebSocket(wsUri);

    websocket.onopen = function (evt) {
        console.log("WEBSOCKET: connected to", wsUri);
    };

    websocket.onmessage = function (evt) {
        console.log("WEBSOCKET: message", evt.data);
        console.log("WEBSOCKET: typeof message", typeof evt.data);
        tinyMCE.get('editor').setContent(evt.data);
    };

    websocket.onerror = function (evt) {
        console.log("WEBSOCKET: error", evt.data);
        window.alert("WEBSOCKET: error: " + evt.data);
    };
}

function editorChanged(e) {
    console.log('DEBUG: editorChanged');
    var editorHTML = tinyMCE.get('editor').getContent();
    websocket.send(editorHTML);
}
