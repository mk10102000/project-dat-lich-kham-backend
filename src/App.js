const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { innitAPIRoute } = require('./routes/routers');

const app = express();
const port = 5000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// config path images
app.use('/', express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

innitAPIRoute(app);
