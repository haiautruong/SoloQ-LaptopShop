const config = {
    url: 'mongodb://localhost:27017/laptop-shop',
    databaseName: 'laptop-shop',
    option: {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 50,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4 // Use IPv4, skip trying IPv6
    }
};

module.exports = config;