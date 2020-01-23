if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env.development' })
}

const cors = require('cors')
const helmet = require('helmet')

const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3333

const app = express()

// ! DataBase CONNECT
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DataBase'))

// ! MIDDLEWARES
app.use(express.json())
app.use(helmet())
app.use(cors({ origin: 'http://localhost:3000' }))

// ! ROUTES
const authRoute = require('./routes/Auth')

// ! ROUTE MIDDLEWARES
app.use('/auth', authRoute)

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
