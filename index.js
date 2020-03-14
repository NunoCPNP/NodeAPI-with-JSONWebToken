if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env.development' })
}

const cors = require('cors')
const helmet = require('helmet')

const express = require('express')
const mongoose = require('mongoose')

const logger = require('./middlewares/Logger')

const PORT = process.env.PORT || 3333

const app = express()

//* DEVELOPMENT LOGGER MIDDLEWARE
app.use(logger)

//* DataBase CONNECT
mongoose.connect(
  `${process.env.DB_CONNECT}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DataBase'))

//* MIDDLEWARES
app.use(express.json())
app.use(helmet())
app.use(cors({ origin: 'http://localhost:3000' }))

//* ROUTES
const authRoute = require('./routes/Auth')
const projectsRoute = require('./routes/Projects')

//* ROUTE MIDDLEWARES
app.use('/auth', authRoute)
app.use('/projects', projectsRoute)

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
