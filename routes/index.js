const AppController = require('../controllers/app')

module.exports = (app, environment) => {
    const controller = new AppController(environment)

    app.get('/', (req, res) => controller.loadApp(req, res))
    app.get('/tickets', (req, res) => controller.ticketsAtPage(req, res))
    app.get('/ticket/:id', (req, res) => controller.showTicket(req, res))
}
