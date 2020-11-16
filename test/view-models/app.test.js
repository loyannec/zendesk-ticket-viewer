const expect = require('chai').expect
const sinon = require('sinon')
const ZendeskEnvironment = require('../../api/environment')
const ZendeskAPIClient = require('../../api/client')
const AppViewModel = require('../../view-models/app')
const { User, Ticket, TicketsListPage } = require('../../api/models')

describe('App View Model', () => {
    const environment = new ZendeskEnvironment('subdomain', 'username', 'token')
    const user = new User(1, 'Loyanne Repolho', 'loyanne.cristine@gmail.com')
    const ticketsPage = new TicketsListPage(
        [new Ticket(3), new Ticket(4)],         // tickets
        10,                                     // count
        2,                                      // page
        true,                                   // has next page?
        true                                    // has previous page?
    )
    var viewModel

    beforeEach(() => {
        viewModel = new AppViewModel(environment)
    })

    context('Get User', () => {
        it('Should return a user', async () => {
            sinon.stub(ZendeskAPIClient.prototype, 'getUser').callsFake(() => ({ success: user }))

            var response = await viewModel.getUser()
            expect(response.success).to.be.equal(user)
        })

        it('Returns error when client fails', async () => {
            sinon.stub(ZendeskAPIClient.prototype, 'getUser').callsFake(() => ({ error: new Error() }))

            var response = await viewModel.getUser()
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    context('Get Tickets At Page', () => {
        it('Should return a list of tickets', async () => {
            var givenPage = undefined
            var givenSize = undefined

            sinon.stub(ZendeskAPIClient.prototype, 'getTicketsAtPage').callsFake((page, size) => {
                givenPage = page
                givenSize = size
                return { success: ticketsPage }
            })

            var response = await viewModel.getTicketsAtPage(2)
            expect(response.success).to.be.equal(ticketsPage)
            expect(givenPage).to.be.equal(2)
            expect(givenSize).to.be.equal(25)
        })

        it('Returns error when client fails', async () => {
            sinon.stub(ZendeskAPIClient.prototype, 'getTicketsAtPage').callsFake(() => ({ error: new Error() }))

            var response = await viewModel.getTicketsAtPage(1)
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    context('Get Ticket Details', () => {
        it('Should return a ticket', async () => {
            var ticket = new Ticket(1)
            var givenIdentifier = null

            sinon.stub(ZendeskAPIClient.prototype, 'getTicket').callsFake((identifier) => {
                givenIdentifier = identifier
                return { success: ticket }
            })

            var response = await viewModel.getTicket(10)
            expect(response.success).to.be.equal(ticket)
            expect(givenIdentifier).to.be.equal(10)
        })

        it('Returns error when client fails', async () => {
            sinon.stub(ZendeskAPIClient.prototype, 'getTicket').callsFake(() => ({ error: new Error() }))

            var response = await viewModel.getTicket(1)
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    afterEach(() => {
        sinon.restore()
    })
})
