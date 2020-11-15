const BaseZendeskRequest = require('./base-request')

class GetTicketsZendeskRequest extends BaseZendeskRequest {
    async execute() {
        return await this.get('/tickets.json')
    }
}

module.exports = GetTicketsZendeskRequest
