const BaseZendeskRequest = require('./base-request')

class ListTicketsZendeskRequest extends BaseZendeskRequest {
    page
    limit

    static maximumLimit = 100

    constructor(environment, page, limit) {
        super(environment)
        if (limit) {
            limit = Math.min(limit, ListTicketsZendeskRequest.maximumLimit)
        }
        this.page = page
        this.limit = limit
    }

    async execute() {
        return await this.get('/tickets.json', { page: this.page, per_page: this.limit })
    }
}

module.exports = ListTicketsZendeskRequest
