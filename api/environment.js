const ZendeskCredentials = require('./credentials')

class ZendeskEnvironment {
    constructor(subdomain, username, password) {
        this.subdomain = subdomain
        this.credentials = new ZendeskCredentials(username, password)
    }
}

module.exports = ZendeskEnvironment
