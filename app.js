const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./helpers/emailer');

//ROUTERS
const mainRouter = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

//CONEXION DATABASE
require('./database/db');

//TEMPLATES ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use('/', mainRouter);

app.listen(port, () => {
  console.log('\n🚀🚀 SERVIDOR FUNCIONANDO 🚀🚀');
});
