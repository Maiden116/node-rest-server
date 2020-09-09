const express = require('express')
const app = express()
    //UserRoutes
app.use(require('./user'));
//LoginRoutes
app.use(require('./login'));

module.exports = app;