const BaseZendeskRequest = require('./base-request')

class GetTicketsZendeskRequest extends BaseZendeskRequest {
    identifier

    constructor(environment, identifier) {
        super(environment)
        this.identifier = identifier
    }

    async execute() {
        return await this.get(`/tickets/${this.identifier}.json`)
    }
}

module.exports = GetTicketsZendeskRequest
