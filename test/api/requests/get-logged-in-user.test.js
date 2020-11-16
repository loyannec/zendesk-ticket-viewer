const expect = require('chai').expect
const nock = require('nock')
const GetLoggedInUserZendeskRequest = require('../../../api/requests/get-logged-in-user')
const ZendeskEnvironment = require('../../../api/environment')

describe('Get Logged In User Zendesk Request', () => {
    var request

    beforeEach(() => {
        var environment = new ZendeskEnvironment('subdomain', 'username', 'token')
        request = new GetLoggedInUserZendeskRequest(environment)
    })

    it('Should return current logged in user', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/users/me.json')
            .reply(200, {
                user: {
                    id: 1,
                    subject: 'A User'
                }
            })

        var response = await request.execute()
        expect(response.success.user).to.be.an('object')
        expect(response.success.user).to.be.eql({ id: 1, subject: 'A User' })
    })

    it('Should return an error', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
            .get('/users/me.json')
            .replyWithError('bad request')

        var response = await request.execute()
        expect(response.error).to.be.an('error')
    })
})
