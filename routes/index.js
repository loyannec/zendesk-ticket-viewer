const HomeController = require('../controllers/home')

module.exports = (app, environment) => {
    const home = new HomeController(environment)

    app.get('/', (req, res) => home.show(req, res))
    app.get('/list-tickets', (req, res) => home.listTickets(req, res))
}
