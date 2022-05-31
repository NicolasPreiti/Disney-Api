const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

const sendMail = (userMail)=>{
    const msg = {
      to: userMail,
      from: fromEmail, // Use the email address or domain you verified above
      subject: 'Bienvenido al mundo de Disney',
      text: 'xd',
      html: `<h1> Bienvenido, te has registrado </h1>
             <p>Ya puedes explorar los personajes y peliculas del mundo de disney</p>`,
    };

    sgMail.send(msg)
        .then(()=>console.log('Email enviado'))
        .catch((err)=>console.log(err));
};

module.exports = {sendMail};