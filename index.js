const { json } = require("express")
const create = require("./view/createAndUpdateRecords/createRecords")
const express = require('express');
const app = express();
const port = 3000;
const createTable = require("./models/index");

createTable.creteTable()

app.use(express.json());

app.post('/creatrCustomer', create.createCustomer);

app.listen(port);