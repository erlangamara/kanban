const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const route = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');

app.use('/', route);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})