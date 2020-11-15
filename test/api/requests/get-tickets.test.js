const expect = require('chai').expect
const nock = require('nock')
const GetTicketsZendeskRequest = require('../../../api/requests/get-tickets')
const ZendeskEnvironment = require('../../../api/environment')

describe('Get Tickets Request', () => {
    var request

    beforeEach(() => {
        var environment = new ZendeskEnvironment('subdomain', 'username', 'token')
        request = new GetTicketsZendeskRequest(environment)
    })

    it('Should return a list of tickets', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets.json')
            .reply(200, {
                tickets: []
            })

        var response = await request.execute()
        expect(response.success.tickets).to.be.empty
    })

    it('Should return a list with 4 tickets', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets.json')
            .reply(200, {
                tickets: [{}, {}, {}, {}]
            })

        var response = await request.execute()
        expect(response.success.tickets).to.lengthOf(4)
    })
})
