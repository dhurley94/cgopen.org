var request = require('request');

let twitClient = {
    apiKey: 'KZdbFXJc6oysCBNDcu2Xxtmxj',
    secret: 'V8Qjacerev26jY3E0ddE9qylNBwQuaa0XS1EwuYRvMkUQgrBM6',
};

module.exports = {
    getTwitterFeed: (cb) => {
        twitClient.get('statuses/user_timeline', 'Cryptohost', (error, tweets, response) => {
            if (error) {throw error};
            return cb(tweets);
        });
    }
}