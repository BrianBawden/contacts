const express = require('express')
const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId
const dbName = "contacts"
const dbCollection = "contactInfo"

const app = express()
app.use(express.json)


const getAll = async (req, res) => {
  
  try{
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .find()
    result.toArray().then((lists) => {
      res.json(lists)
      mongodb.closeDB
    })
  }catch(err){
    res.status(400).send("request failed: " + err)
  }
}

const getById = async (req, res) => {
  try{
    const userId = new ObjectId(req.params.id)
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .find({_id: userId})
    result.toArray().then((lists) => {
      res.json(lists[0])
    })
  } catch(err){
    res.status(400).send("search failed." + err)
  }
}

const insertOne = async (req, res) => {

  const requiredFields = ["firstName", "lastName", "email", "favoriteColor", "birthday"]
  const hasRequiredFields = requiredFields.every(field => req.body[field] !== undefined)

  if (!hasRequiredFields){
    return res.status(400).send("All fields are required")
  }

  try{
      const result = await mongodb
        .getDb()
        .db(dbName)
        .collection(dbCollection)
        .insertOne(req.body)
        .then(result => {
          res.send(result.insertedId).status(201)
        })

  }catch(err){
    res.status(400).send("Add failed. " + err)
  }
}

module.exports = {
  getAll,
  getById,
  insertOne
}