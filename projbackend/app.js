require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTION SUCCESSFULLY");
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
