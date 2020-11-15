const JSONInitializable = require('./json-initializable')
const Ticket = require('./ticket')

class TicketListPage extends JSONInitializable {
    tickets
    count
    page
    hasNext
    hasPrevious

    constructor(tickets, count, page, hasNext, hasPrevious) {
        super()
        this.tickets = tickets
        this.count = count
        this.page = page
        this.hasNext = hasNext
        this.hasPrevious = hasPrevious
    }

    static createFromJson(json) {
        var page = null
        var hasNext = false
        var hasPrevious = false

        if (json.next_page) {
            let nextPage = TicketListPage.#getPageFromURL(json.next_page)
            if (nextPage) {
                page = nextPage - 1
            }
            hasNext = true
        }

        if (json.previous_page) {
            let previousPage = TicketListPage.#getPageFromURL(json.previous_page)
            if (previousPage) {
                page = previousPage + 1
            }
            hasPrevious = true
        }

        return new TicketListPage(json.tickets.map((t) => Ticket.createFromJson(t)),
                                  json.count,
                                  page,
                                  hasNext,
                                  hasPrevious)
    }

    static #getPageFromURL(urlString) {      // private method
        let search = new URLSearchParams(new URL(urlString).search)
        return search.get('page') ? parseInt(search.get('page')) : null
    }
}

module.exports = TicketListPage
