const Environment = require('./api/environment')
const environment = new Environment(
    'loyannechelp',                             // subdomain
    'loyanne.cristine@gmail.com',               // email
    'id5wgoiRXF32BuuMgXD9raBDyAbimzC4mLgaa8gn'  // token
)

const express = require('express')
const app = express()
const port = 3000

require('./config')(app)
require('./routes')(app, environment)

/*
Testing if start server
*/
console.log("Starting server")
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
