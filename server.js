require('dotenv').config();

const app = require('express')(),
      mongoose = require('mongoose'),
    
      parser = require('body-parser'),
      routers = require('./routers'),
    
      PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Successfully connected to MongoDB!');
});

app.use(require('cors')());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/users', routers.UserRouter);
app.use('/rates', routers.RateRouter);

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server successfully started on port ${ PORT }!`);
});
