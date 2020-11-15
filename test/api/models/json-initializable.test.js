const expect = require('chai').expect
const JSONInitializable = require('../../../api/models/json-initializable')

describe('JSON Initializable Model', () => {
    it('Must throw an exception when executing static method createFromJson', () => {
        expect(JSONInitializable.createFromJson).to.throw()
    })
})
