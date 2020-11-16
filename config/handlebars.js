module.exports = (app) => {
    const exphbs  = require('express-handlebars')
    const handlebars = exphbs.create({                 // Module that permits to render a template.
        helpers: {
            formatDate: (date) => {
                var time = date.toLocateTimeString([], {
                    hour: '2-digit', minute: '2-digit'
                })
                var day = date.toLocateTimeString('en-IE', {
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
