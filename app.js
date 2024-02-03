const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./db/connect')
// const cors = require('cors')

const port = process.env.PORT || 8080
const app = express()

app 
  .use(bodyParser.json())
  // .use(cors({
  //   origin: "*"
  // }))
  .use((req, res, next) =>{
    res.setHeader('Acess-Control-Allow-Origin', '*')
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    // );
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
  })
  .use('/', require('./routes'))

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`DB connected listening on ${port}`)
  }
})

