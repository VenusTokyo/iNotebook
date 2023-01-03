const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
//creat a user using: post "api/auth/createuser". doesnt require auth
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atlest 5 charecters').isLength({ min: 5 })
], 
async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) 
  {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email })
  //check whether the email aslready exists
  if (user) 
  {
    return res.status(400).json({ error: "sorry a user with this email already exists" })
  }
  user = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  })

  // .then(user => res.json(user))
  // .catch(err => {
  //   console.log(err)
  res.json({ "nice": "nice" })




})
module.exports = router