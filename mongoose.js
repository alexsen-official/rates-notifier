const { mongoose } = require('mongoose');

const uri = process.env.CONNECTION_STRING;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options, err => {
    if (err) throw err;
    console.log('[server]: successfully connected to MongoDB!');
});
