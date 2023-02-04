const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { innitAPIRoute } = require('./src/routes/routers');

const app = express();
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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

innitAPIRoute(app);
