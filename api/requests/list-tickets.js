const BaseZendeskRequest = require('./base-request')

class ListTicketsZendeskRequest extends BaseZendeskRequest {
    async execute() {
        return await this.get('/tickets.json')
    }
}

module.exports = ListTicketsZendeskRequest
