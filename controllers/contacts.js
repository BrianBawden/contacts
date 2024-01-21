const { response } = require('express')
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

const insertOne = async (req, res) => {
  const firstName = req.params.firstName
  const lastName = req.params.lastName
  const email = req.params.email
  const favoriteColor = req.params.favoriteColor
  const birthday = req.params.birthday
  const result = await mongodb
    .getDb()
    .db(dbName)
    .collection(dbCollection)
    .insertOne({
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`,
      favoriteColor: `${favoriteColor}`,
      birthday: `${birthday}`
  })
  res.send(result.insertedId)
}

module.exports = {
  getAll,
  getById
}