const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://phuduc:phuduc123@ds335275.mlab.com:35275/pusherpoll', { useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));