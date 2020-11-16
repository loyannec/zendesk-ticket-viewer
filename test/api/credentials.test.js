const expect = require('chai').expect
const ZendeskCredentials = require('../../api/credentials')

describe('Zendesk Credentials', () => {
    it('Should assert credentials are encoded properly', () => {
        let credentials = new ZendeskCredentials(
            'jdoe@example.com',
            '6wiIBWbGkBMo1mRDMuVwkw1EPsNkeUj95PIz2akv'
        )

        expect(credentials.encoded())
            .to.be
                .equal('amRvZUBleGFtcGxlLmNvbS90b2tlbjo2d2lJQldiR2tCTW8xbVJETXVWd2t3MUVQc05rZVVqOTVQSXoyYWt2')
    })
})
