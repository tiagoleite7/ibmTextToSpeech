const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('../controller/autController')(app)
app.listen(port)