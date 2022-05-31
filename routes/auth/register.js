const bcrypt = require('bcrypt');
const registerRouter = require('express').Router();
const { Users } = require('../../database/db');
const { defaultValues, createDefault } = require('../../database/defaultValues');
const { sendMail } = require('./emailer');

registerRouter.get('/', (req, res)=>{
    res.render('auth/register', {
        title: 'Registro',
        alert: false,
    });
});

registerRouter.post('/', async(req, res)=>{
    const {email, password} = req.body;
    const repeatUser = await Users.findOne({where: {email}});
    
    if (repeatUser) {
        return res.render('auth/register', {
            title: 'Registro',

            //ALERTA
            alert: true,
            alertIcon: 'error',
            alertTitle: 'Correo electronico no valido',
            alertText: 'El correo electronico ya se encuentra en uso',
            showConfirmButton: true,
            timer: false,
            route: 'auth/register'
            
        });
    };

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = await Users.create({
        email,
        password: passwordHash,
    }); 

    sendMail(newUser.email);

    createDefault(newUser.id);

    res.render('auth/register', {
        title: 'Registro',

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Registro Exitoso',
        alertText: 'Has sido registrado',
        showConfirmButton: false,
        timer: 1500,
        route: 'auth/login'
        
    });
});

module.exports = {registerRouter};