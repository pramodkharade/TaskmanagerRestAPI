const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = 'sg.iR9HJ4yiS4SoIB9PmQw4XQ.1QIF4kRztK92ZMD9fpQBVtlqLr4Bh1aIaH5JAZ0_lzI';
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