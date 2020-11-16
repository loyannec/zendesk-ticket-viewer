const expect = require('chai').expect
const nock = require('nock')
const GetTicketZendeskRequest = require('../../../api/requests/get-ticket')
const ZendeskEnvironment = require('../../../api/environment')

describe('Get Ticket Zendesk Request', () => {
    var request

    beforeEach(() => {
        var environment = new ZendeskEnvironment('subdomain', 'username', 'token')
        request = new GetTicketZendeskRequest(environment, 1)
    })

    it('Should return a ticket', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets/1.json')
            .reply(200, {
                ticket: {
                    id: 1,
                    subject: 'A Ticket'
                }
            })

        var response = await request.execute()
        expect(response.success.ticket).to.be.an('object')
        expect(response.success.ticket).to.be.eql({ id: 1, subject: 'A Ticket' })
    })

    it('Should return an error', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/tickets/1.json')
            .replyWithError('bad request')

        var response = await request.execute()
        expect(response.error).to.be.an('error')
    })
})
