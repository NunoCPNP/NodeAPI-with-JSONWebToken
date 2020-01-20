require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3333

const app = express()

//! DataBase CONNECT
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DataBase'))

// MIDDLEWARES
app.use(express.json())

//! ROUTES
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

//! ROUTE MIDDLEWARES
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`))
