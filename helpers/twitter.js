var request = require('request');

let twitClient = {
    apiKey: '',
    secret: '',
};

module.exports = {
    getTwitterFeed: (cb) => {
        twitClient.get('statuses/user_timeline', 'Cryptohost', (error, tweets, response) => {
            if (error) {throw error};
            return cb(tweets);
        });
    }
}
