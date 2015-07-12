$(document).ready(function () {
    setupWebsocket();
});

var websocket;
var websocketInput = false;
var bookmark;

function setupWebsocket() {
    var wsUri = "ws://" + document.location.host + document.location.pathname + "endpoint";
    websocket = new WebSocket(wsUri);

    websocket.onopen = function (evt) {
        console.log("WEBSOCKET: connected to", wsUri);
    };

    websocket.onmessage = function (evt) {
        console.log("WEBSOCKET: message", evt.data);
        tinyMCE.get('editor').setContent(evt.data, {
            format: 'raw'
        });
        tinyMCE.get('editor').selection.moveToBookmark(bookmark);
        websocketInput = false;
    };

    websocket.onerror = function (evt) {
        console.log("WEBSOCKET: error", evt.data);
        window.alert("WEBSOCKET: error: " + evt.data);
    };
}

function editorChanged(e) {
    if (!websocketInput) {
        console.log('DEBUG: editorChanged');
        var editorHTML = tinyMCE.get('editor').getContent();
        bookmark = tinyMCE.get('editor').selection.getBookmark(2, true);
        console.log('DEBUG:', editorHTML);
        websocketInput = true;
        websocket.send(editorHTML);
    }
}
