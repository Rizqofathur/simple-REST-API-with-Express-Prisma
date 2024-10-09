const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`server listen at : http://localhost:${port}`);
});
