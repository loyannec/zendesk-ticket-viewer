module.exports = (app) => {
    const exphbs  = require('express-handlebars')
    const handlebars = exphbs.create({
        helpers: {
            formatDate: (date) => {
                var time = date.toLocaleTimeString([], {
                    hour: '2-digit', minute: '2-digit'
                })
                var day = date.toLocaleDateString('en-IE', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })
                return `${time}, ${day}`
            }
        }
    })

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine)
    app.set('view engine', 'handlebars')
}
