const AppViewModel = require('../view-models/app')
const exphbs = require('express-handlebars').create()
const listItemsTemplate = 'views/partials/tickets-list.handlebars'

class AppController {
    constructor(environment) {
        this.viewModel = new AppViewModel(environment)
    }

    async loadApp(req, res) {
        var user = await this.viewModel.getUser()
        var ticketsPage = await this.viewModel.getTicketsAtPage(1)
        res.render('application', { user, ticketsPage })
    }

    async ticketsAtPage(req, res) {
        var page = req.query.page
        if (!page) {
            res.sendStatus(400)
            return
        }

        var ticketsPage = await this.viewModel.getTicketsAtPage(page)
        if (ticketsPage.error) {
            res.sendStatus(400)
            return
        }

        var html = await exphbs.render(listItemsTemplate, {
            layout: false,
            ticketsPage: ticketsPage.success
        })

        res.send({ ticketsPage: ticketsPage.success, html })
    }

    async showTicket(req, res) {
        var ticket = await this.viewModel.getTicket(req.params.id)
        res.render('ticket', { ticket, layout: false })
    }
}

module.exports = AppController
