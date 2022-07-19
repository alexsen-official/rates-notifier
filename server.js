require('dotenv').config();
require('./mongoose');

const express = require('express'),
      app = express(),

      cors = require('cors'),
      parser = require('body-parser'),
      routers = require('./routers'),
      path = require('path'),

      PORT = process.env.PORT || 3000;

app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/email', routers.EmailRouter);
app.use('/rates', routers.RateRouter);
app.use('/users', routers.UserRouter);
app.use('/subscriptions', routers.SubscriptionRouter);

app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/frontend/index.html'))
);

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`[server]: successfully started on port ${ PORT }!`);
});
