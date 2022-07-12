require('dotenv').config();
require('./mongoose');
require('./notifier');

const app = require('express')(),
      
      parser = require('body-parser'),
      routers = require('./routers'),
      
      PORT = process.env.PORT || 3000;

app.use(require('cors')());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/rates', routers.RateRouter);
app.use('/users', routers.UserRouter);
app.use('/subscriptions', routers.SubscriptionRouter);

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`[server]: successfully started on port ${ PORT }!`);
});
