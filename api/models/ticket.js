const JSONInitializable = require('./json-initializable')

class Ticket extends JSONInitializable {
    identifier
    status
    tags
    subject
    description
    createdAt
    updatedAt

    constructor(identifier,
                status,
                tags,
                subject,
                description,
                createdAt,
                updatedAt) {
        super()
        this.identifier = identifier
        this.status = status
        this.tags = tags
        this.subject = subject
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static createFromJson(json) {
        return new Ticket(json.id,
                          json.status,
                          json.tags,
                          json.subject,
                          json.description,
                          new Date(json.created_at),
                          new Date(json.updated_at))
    }
}

module.exports = Ticket
