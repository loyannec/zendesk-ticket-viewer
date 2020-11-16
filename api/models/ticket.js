const JSONInitializable = require('./json-initializable')

class Ticket extends JSONInitializable {
    identifier
    status
    tags
    subject
    description
    createdAt
    updateAt

    constructor(identifier,
                status,
                tags,
                subject,
                description,
                createdAt,
                updateAt) {
        super()
        this.identifier = identifier
        this.status = status
        this.tags = tags
        this.subject = subject
        this.description = description
        this.createdAt = createdAt
        this.updateAt = updateAt
    }

    static createFromJson(json) {
        return new Ticket(json.id,
                          json.status,
                          json.tags,
                          json.subject,
                          json.description,
                          new Date(json.created_at),
                          new Date(json.update_at))
    }
}

module.exports = Ticket
