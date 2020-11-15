const expect = require('chai').expect
const sinon = require('sinon')
const ZendeskEnvironment = require('../../../api/environment')
const ZendeskAPIClient = require('../../../api/client')
const { GetLoggedInUserZendeskRequest,
        GetTicketZendeskRequest,
        ListTicketsZendeskRequest } = require('../../api/requests')

describe('API Client', () => {
    const environment = new ZendeskEnvironment('subdomain', 'username', 'token')
    var client

    beforeEach(() => {
        client = new ZendeskAPIClient(environment)
    })

    it('Can get a valid user', async () => {
        sinon.stub(GetLoggedInUserZendeskRequest.prototype, 'get', () => {
            return {
                success: {
                    user: { identifier: 1, name: 'Loyane Repolho', email: 'loyanne.cristine@gmail.com' }
                }
            }
        })

        var response = await client.getUser()
        console.log(response)
    })
})
