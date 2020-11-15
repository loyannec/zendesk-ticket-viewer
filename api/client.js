const User = require('./models/user')
const { GetLoggedInUserZendeskRequest,
        GetTicketZendeskRequest,
        ListTicketsZendeskRequest } = require('./requests')

class ZendeskAPIClient {
    constructor(environment) {
        this.environment = environment
    }

    async getUser() {
        var request = new GetLoggedInUserZendeskRequest(this.environment)
        var response = await request.execute()
        return response.success ? User(response.success.user) : response.error
    }
}

module.exports = ZendeskAPIClient
