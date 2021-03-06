const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const config = require('./config.js');
const mongoose = require('mongoose');
require('./routes/round.routes')(app);
require('./routes/user.routes')(app);
require('./config/passport');

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(config.serverport, () => {
  console.log("Server is listening on port 3000");
});

mongoose.set('useCreateIndex', true);