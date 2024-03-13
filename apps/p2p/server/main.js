const express = require("express");
const { ExpressPeerServer } = require("peer");
const app = express();

async function main(port) {

    const server = app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });

    const peerServer = ExpressPeerServer(server, {
        path: "/myapp",
    });

    app.use("/peerjs", peerServer);

    peerServer.on('connection', (client) => {
        console.log('Client connected', client.getId());
    });

    peerServer.on('disconnect', (client) => {
        console.log('Client disconnected', client.getId());
    })

    peerServer.on('error', (err) => {
        console.log('Error', err);
    })

    peerServer.on('message', (client) => {
        console.log('Message', client.getId());
    })
}

module.exports = {
    main,
    app
};

