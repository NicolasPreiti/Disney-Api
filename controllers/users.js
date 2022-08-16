const service = require('../services/users');
const { generateToken } = require('../helpers/jwt');
const { createDefault } = require('../database/defaultValues');
// const { sendMail } = require('../helpers/emailer');

const registerView = (req, res) => {
  res.render('auth/register', {
    title: 'Registro',
    alert: false,
  });
};

const registerUser = async(req, res) => {
  const { body } = req;
  const newUser = await service.registerUser(body);
    
  if (!newUser) {
    return res.render('auth/register', {
      title: 'Registro',

      //ALERTA
      alert: true,
      alertIcon: 'error',
      alertTitle: 'Correo electronico no valido',
      alertText: 'El correo electronico ya se encuentra en uso',
      showConfirmButton: true,
      timer: false,
      route: 'auth/register',
            
    });
  }

  // // sendMail(newUser.email);
  createDefault(newUser.id);

  res.render('auth/register', {
    title: 'Registro',

    // Alert
    alert: true,
    alertIcon: 'success',
    alertTitle: 'Registro Exitoso',
    alertText: 'Has sido registrado',
    showConfirmButton: false,
    timer: 1500,
    route: 'auth/login',
        
  });
};

const loginView = (req ,res) => {
  res.render('auth/login', {
    title: 'Login',
    alert: false,
  });
};

const loginUser = async(req, res) => {
  const { body } = req;
  const user = await service.loginUser(body);

  if (!user) {
    return res.render('auth/login', {
      title: 'Login',

      alert: true,
      alertIcon: 'error',
      alertTitle: 'No valido',
      alertText: 'El correo o la contraseña son erroneos',
      showConfirmButton: true,
      timer: false,
      route: 'auth/login',
         
    });
  }
    
  const userData = { 
    id: user.id, 
  };
  const token = generateToken(userData);

  const cookieOptions = {
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
  res.redirect('/');
};

module.exports = {
  registerView,
  registerUser,
  loginView,
  loginUser,
};
