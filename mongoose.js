require('mongoose').connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true,
      useUnifiedTopology: true },
    err => {
        if (err) throw err;
        console.log('[server]: successfully connected to MongoDB!');
    });
