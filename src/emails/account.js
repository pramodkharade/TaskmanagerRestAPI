const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '';
sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'kharade.pramod91@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name} Let me know how you get along with the app`
    });
}

const sendcancelationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'kharade.pramod91@gmail.com',
        subject:'Sorry to see you go!',
        text:`Goodbye , ${name} I hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendcancelationEmail
}