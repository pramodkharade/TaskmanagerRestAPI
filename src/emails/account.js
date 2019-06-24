const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '';
sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'pramod.kharade@blazeclan.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name} Let me know how you get along with the app`
    });
}

module.exports = {
    sendWelcomeEmail
}