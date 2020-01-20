const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { registrationValidation, loginValidation } = require('../utils/validation')

const User = require('../model/User')

module.exports = {
  async register (req, res) {
    // ? CHECK VALIDATION
    const { error } = registrationValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // ? CHECK IF EMAIL ALREADY EXISTS
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    // ? HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // ? CREATE NEW USER
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    try {
      const savedUser = await user.save()
      res.send({ user: user._id })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  async login (req, res) {
    // ? CHECK VALIDATION
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // ? CHECK IF EMAIL ALREADY EXISTS
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    // ? PASSWORD VALIDATION
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    // ? SEND TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
  }
}
