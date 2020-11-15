class ZendeskCredentials {
    constructor(username, token) {
        this.username = username
        this.token = token
    }

    encoded() {
        return Buffer.from(`${this.username}/token:${this.token}`).toString('base64')
    }
}

module.exports = ZendeskCredentials
