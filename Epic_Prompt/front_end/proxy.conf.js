const PROXY_CONFING = [{
    context: ['/api'],
    target: 'htpp://localhost:8080/',
    secure: false,
    logLevel: 'debug'
}];

module.exports = PROXY_CONFING;