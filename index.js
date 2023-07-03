require("./mongoDB/config");
require("dotenv").config();
const express = require('express');
const app = express();
const router = require("./routes")
// const bodyParser =  require("body-parser");

const cors = require("cors"); 


app.use(cors())
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true }));
// app.use(bodyParser.json());
app.use(router) 


app.all("*", (req, res, next) => { 
    res.status(404).send(`The URL ${req.originalUrl} does not exists`);
});

app.listen(process.env.PORT, () => {
  console.log(`Application is running on port ${process.env.PORT}`);
});