const express = require('express');
const app = express();
const port = 3000;

require('./config')(app);
require('./routes')(app);

/*
Testing if start server
*/
console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
