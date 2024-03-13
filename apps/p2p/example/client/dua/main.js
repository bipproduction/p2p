import { Peer } from "https://esm.sh/peerjs@1.5.2?bundle-deps"

const url = new URL(window.location.href)

const peer = new Peer("client2", {
    host: url.hostname,
    port: 3018,
    path: "peerjs/myapp",
});

peer.on('connection', function (conn) {
    conn.on('data', function (data) {
        // Will print 'hi!'
        console.log("[Connection]: ", data);
        $("#message").append(`<p>${data}</p>`);
    });
});

peer.on('open', function () {
    console.log('[Peer ID]: ' + peer.id);

});

peer.on("message", function (data) {
    console.log("[message]: " + data);
    $("#message").append(`<p>${data}</p>`);
});

$("#send").on('click', async function () {
    console.log("coba kirim")
    const conn = await peer.connect('client1');
    conn.on('open', function () {
        conn.send('hi! apakabarny ya hahahaha');
        console.log("kirim dari client1")
    });
});


$("#call").on('click', function () {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, function (stream) {
        var call = peer.call('client1', stream);
        call.on('stream', function (remoteStream) {
            // Show stream in some video/canvas element.
            var video = document.querySelector('video');
            video.srcObject = remoteStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        });

    }, function (err) {
        console.log('Failed to get local stream', err);
    });

});

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function (call) {
    getUserMedia({ video: true, audio: true }, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
            // Show stream in some video/canvas element.
            var video = document.querySelector('video');
            video.srcObject = remoteStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
});
