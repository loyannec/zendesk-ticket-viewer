const JSONInitializable = require('./json-initializable')

class Ticket extends JSONInitializable {
    identifier
    type
    status
    priority
    tags
    subject
    description
    createdAt
    updateAt

    constructor(identifier,
                type,
                status,
                priority,
                tags,
                subject,
                description,
                createdAt,
                updateAt) {
        super()
        this.identifier = identifier
        this.type = type
        this.status = status
        this.priority = priority
        this.tags = tags
        this.subject = subject
        this.description = description
        this.createdAt = createdAt
        this.updateAt = updateAt
    }

    static createFromJson(json) {
        return new Ticket(json.id,
                          json.type,
                          json.status,
                          json.priority,
                          json.tags,
                          json.subject,
                          json.description,
                          new Date(json.created_at),
                          new Date(json.update_at))
    }
}

module.exports = Ticket
