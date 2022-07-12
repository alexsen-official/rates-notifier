const schedule = require('node-schedule'),
      mailer = require('nodemailer');

const { User } = require('./models'),
      { RateController } = require('./controllers');

const transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASS
    }
});

schedule.scheduleJob('0 0 * * *', async () => {
    const users = await User.find()
                            .populate('subscriptions');

    for (const user of users) {
        for (const sub of user.subscriptions) {
            const date = new Date();
                  date.setHours(sub.notifyAt.getHours(), sub.notifyAt.getMinutes());
            
            schedule.scheduleJob(date, async () => {
                const rate = await RateController
                    .getByUrl(`${ process.env.API_URL }&field_tdr_date_value=${ date.getFullYear() }`)
                    .then(val => val.data[0]);
    
                if (rate[sub.fRate] > rate[sub.sRate]) {
                    await transport
                        .sendMail({
                            from: process.env.EMAIL_ADRESS,
                            to: user.email,
                            subject: 'Treasury par yield curve rate notice',
                            text: `As of ${ date.toLocaleDateString() }, the treasury rate is ${ sub.fRate } higher than the ${ sub.sRate } rate.\n\nYou received this email because you signed up for daily treasury yield curve updates using the Rates Notifier web-app.`
                        }, (err, info) => {
                            if (err) throw err;
                            console.log(`[server]: email successfully sent to ${ user.email }! (${ info.response })`);
                        });
                }
            });
        }
    }
});

process.on('SIGINT', () => {
    schedule.gracefulShutdown()
            .then(() => process.exit(0));
});
