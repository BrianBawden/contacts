const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contacts')

router.get('/', contactsController.getAll)

router.get('/:id', contactsController.getById)

router.post('/insertOne', contactsController.insertOne)

router.put('/id-to-modify/:id', contactsController.updateOne)

router.delete('/delete/:id', contactsController.deleteOne)
// router.delete('/delete/:id', contactsController.deleteOne);


module.exports = router