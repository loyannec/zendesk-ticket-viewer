const expect = require('chai').expect
const sinon = require('sinon')
const ZendeskEnvironment = require('../../api/environment')
const ZendeskAPIClient = require('../../api/client')
const { User, Ticket, TicketListPage } = require('../../api/models')
const { GetLoggedInUserZendeskRequest,
        GetTicketZendeskRequest,
        ListTicketsZendeskRequest } = require('../../api/requests')

describe('API Client', () => {
    const environment = new ZendeskEnvironment('subdomain', 'username', 'token')
    var client

    beforeEach(() => {
        client = new ZendeskAPIClient(environment)
    })

    context('Get User', () => {
        it('Can get a valid user', async () => {
            var user = {
                id: 1,
                name: 'Loyanne Repolho',
                email: 'loyanne.cristine@gmail.com'
            }
            sinon.stub(GetLoggedInUserZendeskRequest.prototype, 'execute').callsFake(() => ({ success: { user } }))

            var response = await client.getUser()
            expect(response.error).to.be.undefined
            expect(response.success).to.be.an.instanceof(User)
            expect(response.success.identifier).to.be.equal(user.id)
            expect(response.success.name).to.be.equal(user.name)
            expect(response.success.email).to.be.equal(user.email)
        })

        it('Fails when ticket request fails', async () => {
            sinon.stub(GetLoggedInUserZendeskRequest.prototype, 'execute').callsFake(() => ({ error: new Error() }))

            var response = await client.getUser()
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    context('Get Ticket', () => {
        it('Can get a valid ticket', async () => {
            var ticket = {
                id: 1,
                type: 'incident',
                status: 'open',
                priority: 'normal',
                tags: ['zendesk', 'support'],
                subject: 'Subject',
                description: 'Description',
                created_at: '2020-11-14T13:57:32Z',
                update_at: '2020-11-15T13:57:32Z'
            }
            sinon.stub(GetTicketZendeskRequest.prototype, 'execute').callsFake(() => ({ success: { ticket } }))

            var response = await client.getTicket()
            expect(response.error).to.be.undefined
            expect(response.success).to.be.an.instanceof(Ticket)
            expect(response.success.identifier).to.be.equal(ticket.id)
            expect(response.success.type).to.be.equal(ticket.type)
            expect(response.success.status).to.be.equal(ticket.status)
            expect(response.success.subject).to.be.equal(ticket.subject)
            expect(response.success.description).to.be.equal(ticket.description)
            expect(response.success.createdAt).to.be.eql(new Date(ticket.created_at))
            expect(response.success.updateAt).to.be.eql(new Date(ticket.update_at))
        })

        it('Fails when ticket request fails', async () => {
            sinon.stub(GetTicketZendeskRequest.prototype, 'execute').callsFake(() => ({ error: new Error() }))

            var response = await client.getTicket()
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    context('Get Tickets At PAge', () => {
        it('Should return tickets for given page and it should have previous and next page', async () => {
            var page = {
                tickets: [{
                    id: 6,
                    type: 'incident',
                    status: 'open',
                    priority: 'normal',
                    tags: ['zendesk', 'support'],
                    subject: 'Normal Priority Ticket',
                    description: 'Description',
                    created_at: '2020-11-14T13:57:32Z',
                    update_at: '2020-11-15T13:57:32Z'
                }, {
                    id: 7,
                    type: 'incident',
                    status: 'closed',
                    priority: 'high',
                    tags: ['zendesk', 'support'],
                    subject: 'High Priority Ticket',
                    description: 'Description',
                    created_at: '2020-11-14T13:57:32Z',
                    update_at: '2020-11-15T13:57:32Z'
                }],
                next_page: 'https://zendesk.com/tickets.json?page=4&per_page=6',
                previous_page: 'https://zendesk.com/tickets.json?page=2&per_page=6',
                count: 100
            }

            sinon.stub(ListTicketsZendeskRequest.prototype, 'execute').callsFake(() => ({ success: page }))

            var response = await client.getTicketAtPage(3, 2)
            expect(response.success.tickets.length).to.be.equal(2)
            expect(response.success.tickets[0]).to.be.instanceof(Ticket)
            expect(response.success.tickets[0].identifier).to.be.equal(6)
            expect(response.success.tickets[1]).to.be.instanceof(Ticket)
            expect(response.success.tickets[1].identifier).to.be.equal(7)
            expect(response.success.page).to.be.equal(3)
            expect(response.success.count).to.be.equal(100)
            expect(response.success.hasNext).to.be.true
            expect(response.success.hasPrevious).to.be.true
        })

        it('Fails when ticket request also fails', async () => {
            sinon.stub(ListTicketsZendeskRequest.prototype, 'execute').callsFake(() => ({ error: new Error() }))

            var response = await client.getTicketAtPage(1, 10)
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    afterEach(() => {
        sinon.restore()
    })
})
