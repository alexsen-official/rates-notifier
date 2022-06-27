require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose'),
    
      cors = require('cors'),
      parser = require('body-parser'),
      routers = require('./routers'),
    
      app = express(),
      PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Successfully connected to MongoDB!');
});

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/users', routers.UserRouter);

app.listen(PORT,  err => {
    if (err) throw err;
    console.log(`Server successfully started on port ${ PORT }!`);
});
