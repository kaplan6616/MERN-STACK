const express = require('express');
const bodyParser = require('body-parser');
// const mongoCon = require("./mongo");
const mongooseCon = require("./mongoose");

const app = express();

app.use(bodyParser.json());

app.post('/products',mongooseCon.createProduct);

app.get('/products',mongooseCon.getProducts);

app.listen(3000);
