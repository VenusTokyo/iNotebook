const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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

  try{

    let user = await User.findOne({ email: req.body.email })
    //check whether the email aslready exists
    if (user) 
    {
      return res.status(400).json({ error: "sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash (req.body.password,salt)

    //create new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    res.json(user)
  } catch(error){
    console.error(error.message)
    res.status(500).send("Some Error occured")
  }


  // .then(user => res.json(user))
  // .catch(err => {
  //   console.log(err)




})
module.exports = router