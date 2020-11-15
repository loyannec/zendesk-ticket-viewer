const JSONInitializable = require('./json-initializable')

class User {
    identifier
    name
    email

    static createFromJson(json) {
        return new User(json.identifier, json.name, json.email)
}

module.exports = User
