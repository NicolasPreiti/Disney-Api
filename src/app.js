const express = require('express');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes');
require('dotenv').config();
require('./helpers/emailer');

const app = express();
const port = process.env.PORT || 3000;

//  Database connection
require('./database/db');

// Templates Engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`\n🚀🚀 SERVER RUNNING IN PORT ${port} 🚀🚀 `);
});
