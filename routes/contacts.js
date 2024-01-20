const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contacts')

router.get('/', contactsController.getAll)

router.get('/:id', contactsController.getById)

module.exports = router
