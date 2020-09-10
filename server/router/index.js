const express = require('express')
const app = express()
    //UserRoutes
app.use(require('./user'));
//LoginRoutes
app.use(require('./login'));
//CategoryRoutes
app.use(require('./category'));
//ProductRoutes
app.use(require('./product'));
//Upload
app.use(require('./upload'));
//Images
app.use(require('./images'));
module.exports = app;