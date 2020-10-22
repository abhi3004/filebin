require('dotenv').config();
const express=require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
const file = require("./routes/api/fileBin");
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json({ limit: '20mb' }))
app.use("/api", file);

app.listen(process.env.PORT||5000,()=>{
    console.log(`Running server on port: ${process.env.PORT}`);
})