const { User, Ticket, TicketsListPage } = require('./models')
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

    async getTicket(identifier) {
        var request = new GetTicketZendeskRequest(this.environment, identifier)
        var response = await request.execute()
        return response.success
            ? { success: Ticket.createFromJson(response.success.ticket) }
            : { error: response.error }
    }

    async getTicketsAtPage(page, size) {
        var request = new ListTicketsZendeskRequest(this.environment, page, size)
        var response = await request.execute()
        return response.success
            ? { success: TicketsListPage.createFromJson(response.success) }
            : { error: response.error }
    }
}

module.exports = ZendeskAPIClient
