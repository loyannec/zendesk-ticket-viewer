const expect = require('chai').expect
const nock = require('nock')
const ListTicketsZendeskRequest = require('../../../api/requests/list-tickets')
const ZendeskEnvironment = require('../../../api/environment')

describe('List Tickets Request', () => {
    const environment = new ZendeskEnvironment('subdomain', 'username', 'token')
    var request

    beforeEach(() => {
        request = new ListTicketsZendeskRequest(environment)
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

    it('Should send request with pagination', async () => {
        var json = {
            tickets: [{}, {}, {}, {}, {}, {}],
            next_page: 'https://zendesk.com/tickets.json?page=4&per_page=6',
            previous_page: 'https://zendesk.com/tickets.json?page=2&per_page=6',
            count: 300
        }

        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets.json')
            .query({ page: 3, per_page: 6 })
            .reply(200, json)

        var request = new ListTicketsZendeskRequest(environment, 3, 6)
        var response = await request.execute()
        expect(response.success).to.be.eql(json)
    })

    it('Should return a error', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets.json')
            .replyWithError('bad request')

        var response = await request.execute()
        expect(response.error).to.be.an('error')
    })
})
