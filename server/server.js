const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./mongo-database/routes/app');
const bodyParser = require('body-parser');

const corsOptions = {};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

const rounds = [{
  id: 1,
  userId: "",
  course: "Test",
  score: 80,
  fairwaysInReg: 10,
  greensInReg: 9,
  totalPutts: 32,
  totalBirdies: 1,
  totalPars: 9,
}];

// app.get('/rounds', (req, res) => {
//   res.json(rounds);
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})