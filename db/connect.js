const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

let _db

const initDb = (callback) => {
  if(_db) {
    console.log("Already connected")
    return callback(null, _db)
  }
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) =>{
      _db = client;
      callback(null, _db)
    })
    .catch((err) => {
      callback(err)
    })

}

const getDb = () => {
  if(!_db) {
    throw Error('DB initialization failed')
  }
  return _db
}

const closeDB = () => {
  if(_db) {
    MongoClient.close()
    return console.log("connection closed")
  }
  return console.log("no connection to DB")
}

module.exports ={
  initDb,
  getDb,
  closeDB
}