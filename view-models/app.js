const ZendeskAPIClient = require('../api/client')

class AppViewModel {
    static pageSize = 25

    #client

    constructor(environment) {
        this.#client = new ZendeskAPIClient(environment)
    }

    getUser = async () => await this.#client.getUser()

    getTicketsAtPage = async (page) => await this.#client.getTicketsAtPage(page, AppViewModel.pageSize)

    getTicket = async (identifier) => await this.#client.getTicket(identifier)
}

module.exports = AppViewModel
