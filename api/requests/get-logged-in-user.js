const BaseZendeskRequest = require('./base-request')

class GetLoggedInUserZendeskRequest extends BaseZendeskRequest {
    async execute() {
        return await this.get('/users/me.json')
    }
}

module.exports = GetLoggedInUserZendeskRequest
