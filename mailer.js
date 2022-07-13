const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASS
    }
});

class Mailer {
    send = async (recipient, options) => {
        await transport
            .sendMail({
                from: process.env.EMAIL_ADRESS,
                to: recipient,
                ...options
            }, err => {
                if (err) throw err;
                console.log(`[server]: successfully sent an email to ${ recipient }!`);
            });
    };
}

module.exports = new Mailer();
