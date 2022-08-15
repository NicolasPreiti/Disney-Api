const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../database/db');
const { createDefault } = require('../database/defaultValues');
const { sendMail } = require('../helpers/emailer');

const registerView = (req, res) => {
  res.render('auth/register', {
    title: 'Registro',
    alert: false,
  });
};

const registerUser = async(req, res) => {
  const { email, password } = req.body;
  const repeatUser = await Users.findOne({ where: { email } });
    
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
      route: 'auth/register',
            
    });
  }

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
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

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
      route: 'auth/login',
         
    });
  }
    
  const userValid = { id: user.id };

  //CREACION DEL TOKEN
  const token = jwt.sign({ userValid }, process.env.JWT, { expiresIn: '1d' });
  const cookieOptions = {
    httpOnly: true,
  };

  //COOKIE => ALMACENA EL TOKEN
  res.cookie('jwt', token, cookieOptions);
  res.redirect('/');
};

module.exports = {
  registerView,
  registerUser,
  loginView,
  loginUser,
};
