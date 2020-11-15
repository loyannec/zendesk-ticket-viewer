const JSONInitializable = require('./json-initializable')

class User extends JSONInitializable {
    identifier
    name
    email

    constructor(identifier, name, email) {
        super()
        this.identifier = identifier
        this.name = name
        this.email = email
    }

    static createFromJson(json) {
        return new User(json.identifier, json.name, json.email)
}

module.exports = User
