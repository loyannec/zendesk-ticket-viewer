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

    it('Must contains a method named executed', () => {
        expect(request.execute).to.exist
    })

    it('Must throw an exception when executing', () => {
        expect(request.execute).to.throw
    })
})
