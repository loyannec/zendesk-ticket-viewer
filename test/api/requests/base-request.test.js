const expect = require('chai').expect
const nock = require('nock')
const BaseZendeskRequest = require('../../../api/requests/base-request')
const ZendeskEnvironment = require('../../../api/environment')

describe('Base Zendesk Request', () => {
    var request

    beforeEach(() => {
        var environment = new ZendeskEnvironment('subdomain', 'username', 'token')
        request = new BaseZendeskRequest(environment)
    })

    it('Must contain a method named executed', () => {
        expect(request.execute).to.exist
    })

    it('Must throw an exception when executing', () => {
        expect(request.execute).to.throw()
    })

    it('Must contain a method named get', () => {
        expect(request.get).to.exist
    })

    it('Should be a success when getting something', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
        .get('/something.json')
            .reply(200)

        var response = await request.get('/something.json')
        expect(response.success).to.exist
        expect(response.error).to.be.undefined
    })

    it('Should be an error when getting something', async () => {
        nock('https://subdomain.zendesk.com/api/v2')
        .get('/something.json')
            .replyWithError('something went wrong')

        var response = await request.get('/something.json')
        expect(response.success).to.be.undefined
        expect(response.error).to.be.an('error')
    })
})
