const { User, Ticket, TicketListPage } = require('./models')
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
        return response.success
            ? { success: User.createFromJson(response.success.user) }
            : { error: response.error }
    }
}

module.exports = ZendeskAPIClient
