const BaseRequest = require('./base-request')

class GetTicketsRequest extends BaseRequest {
    async execute() {
        return await this.get('/tickets.json')
    }
}

module.exports = GetTicketsRequest
