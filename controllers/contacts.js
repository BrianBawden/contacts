const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId
const dbName = "contacts"
const dbCollection = "contactInfo"


const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db(dbName)
    .collection(dbCollection)
    .find()
  result.toArray().then((lists) => {
    res.json(lists)
    mongodb.closeDB
  })
}

const getById = async (req, res) => {
  const userId = req.params.id
  const result = await mongodb
    .getDb()
    .db(dbName)
    .collection(dbCollection)
    .find({id: userId})
  result.toArray().then((lists) => {
    res.json(lists[0])
  })
}

module.exports = {
  getAll,
  getById
}