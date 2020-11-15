const HomeViewModel = require('../view-models/home')

class HomeController {
    constructor(environment) {
        this.viewModel = new HomeViewModel(environment)
    }

    async show(req, res) {
        var ticketsPage = await this.viewModel.getTicketsAtPage(1)
        res.render('home', { ticketsPage })
    }

    listTickets(req, res) {

    }
}

module.exports = HomeController
