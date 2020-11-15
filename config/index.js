module.exports = (app) => {
    require('./express.js')(app)
    require('./livereload')(app)
    require('./handlebars')(app)
}
