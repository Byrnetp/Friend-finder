'use strict';
const express = require('express');
const apiRouter = require('./app/routing/apiRoutes.js');
const htmlRouter = require('./app/routing/htmlRoutes.js');

const app = express();

app.use(apiRouter);
app.use(htmlRouter);

// Port setup for heroku by default or localhost otherwise
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);