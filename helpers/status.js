const net = require('net');

//Connect to localhost:80
let socket = net.createConnection(8001);

let servers = [
    'node00.cryptohost.io',
    'node01.cryptohost.io',
    'node02.cryptohost.io',
]

let status = [];

servers.forEach((element) => {
    if (socket._connecting === true) {
        status.push(element, 'is online.');
    } else {
        status.push(element, 'is offline.');
    }
});

module.exports = status;
