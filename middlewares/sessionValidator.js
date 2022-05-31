const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const sessionValidator = (req, res, next)=>{
    const accessToken = req.cookies.jwt;

    //Si el token no funciona redirecciona al login.
    if (!accessToken) {
        return res.render('auth/login', {
            title: 'Error',
    
            //ALERTA
            alert: true,
            alertIcon: 'info',
            alertTitle: 'Sin sesion',
            alertText: 'Debes iniciar sesion',
            showConfirmButton: false,
            timer: 1500,
            route: 'auth/login'
        });
    };
    
    const jwtData = jwtDecode(accessToken);
    req.token = jwtData;
    
    jwt.verify(accessToken, process.env.JWT, (err, token)=>{
        if (err) {
            return res.render('auth/login', {
                title: 'Error',
        
                //ALERTA
                alert: true,
                alertIcon: 'info',
                alertTitle: 'Sin sesion',
                alertText: 'Debes iniciar sesion',
                showConfirmButton: false,
                timer: 1500,
                route: 'auth/login'
        });
        } else {
            next();
        };
    });
};

module.exports = {sessionValidator};