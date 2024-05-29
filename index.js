const { json } = require("express")
const create = require("./controller/createAndUpdateRecords/createRecords")
const update = require("./controller/createAndUpdateRecords/updateRecords")
const getProduct = require("./controller/getProducts");
const express = require('express');
const app = express();
const port = 3002;
const createTable = require("./models/index");

createTable.creteTable()

app.use(express.json());

app.post('/createCustomer', create.createCustomer);
app.post('/creatrProduct', create.createProduct);
app.post('/creatrOrder', create.createOrder);
app.put('/updateCustomer', update.updateCustomer);
app.put('/updateProduct', update.updateProduct);
app.get('/sortProduct', getProduct.sortProduct);
app.get('/getMostSellProduct', getProduct.getMostSellProduct);
app.get('/getPercenatgetOfEachSoldProduct', getProduct.getPercenatgetOfEachSoldProduct);
app.get('/getMostfrequentBuyProduct', getProduct.getMostfrequentBuyProduct);

app.listen(port);