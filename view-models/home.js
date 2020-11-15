const ZendeskAPIClient = require('../api/client')

class HomeViewModel {
    static pageSize = 25

    constructor(environment) {
        this.client = new ZendeskAPIClient(environment)
    }

    getUser = async () => await this.client.getUser()

    getTicketsAtPage = async (page) => await this.client.getTicketAtPage(page, HomeViewModel.pageSize)
}

module.exports = HomeViewModel
