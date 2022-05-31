const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const { Users } = require('../../database/db');


loginRouter.get('/', (req ,res)=>{
    res.render('auth/login', {
        title: 'Login',
        alert: false
    });
});

loginRouter.post('/', async(req, res)=>{
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email}});

    const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.password);

    //Si el usuario o contraseña son erroneos lanza error.
    if (!correctPassword) {
         return res.render('auth/login', {
            title: 'Login',

            //ALERTA
            alert: true,
            alertIcon: 'error',
            alertTitle: 'No valido',
            alertText: 'El correo o la contraseña son erroneos',
            showConfirmButton: true,
            timer: false,
            route: 'auth/login'
         
        });
    };
    
    const userValid = {id: user.id};

    //CREACION DEL TOKEN
    const token = jwt.sign({userValid}, process.env.JWT, {expiresIn: '1d'});
    const cookieOptions = {
        httpOnly: true,
    };

    //COOKIE => ALMACENA EL TOKEN
    res.cookie('jwt', token, cookieOptions);
    res.redirect('/');
});

module.exports = {loginRouter};