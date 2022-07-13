const mailer = require('../mailer');

class EmailController {
    send = async (req, res) => {
        try {
            const schedule = new Date(Date.parse(req.body.schedule)).toLocaleDateString();
            
            await mailer.send(req.body.recipient, {
                subject: 'Treasury par yield curve rate notice',
                text: `As of ${ schedule }, the treasury rate is ${ req.body.fRate } higher than the ${ req.body.sRate } rate.\n\nYou received this email because you signed up for daily treasury yield curve updates using the Rates Notifier web-app.`
            });

            res.json();
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new EmailController();
