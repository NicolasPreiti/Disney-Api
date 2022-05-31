const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
require('./routes/auth/emailer');

//ROUTERS
const { mainRouter } = require('./routes/main');
const { authRouter } = require('./routes/auth/auth');
const { modifyRouter } = require('./routes/modify/modify');

const app = express();
const port = process.env.PORT || 5000;


//CONEXION DATABASE
require('./database/db');

//TEMPLATES ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

//MIDDLEWARES
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded());


//RUTAS
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/modify', modifyRouter);

app.listen(port, (req, res)=>{
    console.log('\n🚀🚀 SERVIDOR FUNCIONANDO 🚀🚀');
});