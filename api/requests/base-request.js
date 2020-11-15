const axios = require('axios')

class BaseZendeskRequest {
    constructor(environment) {
        this.request = axios.create({
            baseURL: `https://${environment.subdomain}.zendesk.com/api/v2/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${environment.credentials.encoded()}`
            }
        })
    }

    execute() {
        throw new Error('not implemented')
    }

    async get(path, params) {
        try {
            const response = await this.request.get(path, { params })
            return { success: response.data }
        } catch (error) {
            return { error }
        }
    }
}

module.exports = BaseZendeskRequest
