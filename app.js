const express = require("express");
const homeRoute = require("./routes/home-route")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
  
app.use("/", homeRoute)


app.listen(9000,()=>{
    console.log("Server started at port 9000")
})