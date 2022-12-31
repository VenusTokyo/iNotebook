const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
//creat a user using: post "api/auth/". doesnt require auth
router.post('/',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atlest 5 charecters').isLength({ min: 5 })
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user)).catch(err=>{console.log(err)
      res.json({error:'pleas enter a unique value in email',message: err.message})});
  

    
})
module.exports = router