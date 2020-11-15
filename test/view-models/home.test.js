const expect = require('chai').expect
const sinon = require('sinon')
const ZendeskEnvironment = require('../../api/environment')
const ZendeskAPIClient = require('../../api/client')
const HomeViewModel = require('../../view-models/home')
const { User, Ticket, TicketListPage } = require('../../api/models')

describe('Home View Model', () => {
    const environment = new ZendeskEnvironment('subdomain', 'username', 'token')
    const user = new User(1, 'Loyanne Repolho', 'loyanne.cristine@gmail.com')
    const ticketsPage = new TicketListPage(
        [new Ticket(3), new Ticket(4)],             // tickets
        10,                                         // count
        2,                                          // page
        true,                                       // has next page?
        true                                        // has previous page?
    )
    var viewModel

    beforeEach(() => {
        viewModel = new HomeViewModel(environment)
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

            sinon.stub(ZendeskAPIClient.prototype, 'getTicketAtPage').callsFake((page) => {
                givenPage = page
                return { success: ticketsPage }
            })

            var response = await viewModel.getTicketsAtPage(2)
            expect(response.success).to.be.equal(ticketsPage)
            expect(givenPage).to.be.equal(2)
        })

        it('Returns error when client fails', async () => {
            sinon.stub(ZendeskAPIClient.prototype, 'getTicketAtPage').callsFake(() => ({ error: new Error() }))

            var response = await viewModel.getTicketsAtPage()
            expect(response.success).to.be.undefined
            expect(response.error).to.be.an('error')
        })
    })

    afterEach(() => {
        sinon.restore()
    })
})