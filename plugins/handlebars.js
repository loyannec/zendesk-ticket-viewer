module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create({                 // Module that permits to render a template.
        helpers: {
            isDefined: (value) => value !== undefined        // Adding helper to verify if value is defined.
        }
    });

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
